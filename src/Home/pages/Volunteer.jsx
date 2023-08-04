import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import LoadingSpinner from "@/utils/loadingSpinner";
import { Footer } from "../widgets/layout";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "@/Config/config";

const VolunteerSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user_id = localStorage.getItem("user_id")
  const handleBecomeVolunteer = async () => {
    try {
      const response = await axios.patch(`${API_URL}/become-volunteer/${user_id}/`);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "You've successfully become a volunteer.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <>

<section className="relative block h-[50vh]">
  <div
    className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://www.shutterstock.com/image-photo/many-caucasian-people-hands-holding-260nw-276960296.jpg')] bg-cover bg-center"
  />

  <div className="absolute top-0 h-full w-full bg-black/75" />
</section>


      {isLoading && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-50"
          aria-hidden="true"
        >
          <LoadingSpinner/>
        </div>
      )}




    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Join Our Team of Volunteers</h2>
        <div className="flex justify-center mb-6">
          <img src="https://t4.ftcdn.net/jpg/02/72/39/87/360_F_272398712_z28EMWLbM9Y8zojg51tLZo4D8Ju3R7EG.jpg" alt="Volunteers in action" className="w-64 h-64 rounded-full" />
        </div>
        <p className="text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum urna a erat hendrerit,
          nec posuere nulla rhoncus.
        </p>
        <p className="text-gray-700 mb-6">
          Nunc in ante consectetur, dignissim nunc a, commodo velit. Nulla facilisi. Praesent in nulla eu urna
          dignissim venenatis.
        </p>
        <p className="text-gray-700 mb-10">
          Proin rhoncus metus vel arcu lacinia, eu blandit eros finibus. Nulla facilisi. Sed nec urna vel elit
          interdum dignissim.
        </p>
        <Button color="blue" ripple="light" onClick={handleBecomeVolunteer}>
          Become a Volunteer
        </Button>
      </div>
    </section>
  
      
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
};

export default VolunteerSection;
