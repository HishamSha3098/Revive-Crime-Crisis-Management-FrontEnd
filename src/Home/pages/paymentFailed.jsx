import { Link, useSearchParams } from "react-router-dom";

const PaymentFail = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  let session_id = searchParams.get("session_id")
  console.log(searchParams.get("session_id"))

  return (
    <>
      <div className="bg-gray-100">
  <div className="bg-white p-6 md:mx-auto">
  <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
  <path
    fill="currentColor"
    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6,16.588L16.588,18,12,13.412,7.412,18,6,16.588,10.588,12,6,7.412,7.412,6,12,10.588,16.588,6,18,7.412,13.412,12Z"
  ></path>
</svg>
    <div className="text-center">
      <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
      <p className="text-gray-600 my-2">Payment Process Failed Due to Technical error.</p>
      <p>Try Again!</p>
      <div className="py-10 text-center">
        <Link to="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
          GO BACK
        </Link>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default PaymentFail