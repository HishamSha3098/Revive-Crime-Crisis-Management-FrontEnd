import React, { useState } from 'react';
import axios from 'axios';  // Import Axios
import { useLocation } from 'react-router-dom';
import { API_URL } from '@/Config/config';
import { toast } from 'react-hot-toast';
import { Footer } from '../widgets/layout';

const Checkout = () => {
    const [donationAmount, setDonationAmount] = useState('');
    const location = useLocation();
    const id = location.state?.id;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (donationAmount) {
            const data = {
                price: donationAmount,
                crisis_id:id
            };

            axios.post(`${API_URL}/create-checkout-session/`, data)
                .then(response => {
                    // Redirect to Stripe checkout session URL
                    console.log(response.data,'------------------------this thst url------------------');
                    toast.success("Payment Processing....")
                    window.location.href = response.data;
                    
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <>
        <section className="relative block h-[50vh]">
  <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/banner-crisis.jpg')] bg-cover bg-center" />

  <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />

 
</section>
            <div className="flex items-center justify-center pt-6">
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Enter Amount to Pay</h2>
    <div className="flex items-center space-x-4">
        <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={donationAmount}
        className="border rounded px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        onChange={(e)=> setDonationAmount(e.target.value)}
        placeholder="Amount"
      />
      <button type='submit' disabled={!donationAmount} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-semibold">
        Pay
      </button>
      </form>
    </div>
  </div>
</div>

<br/>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>

        </>
    );
}

export default Checkout;
