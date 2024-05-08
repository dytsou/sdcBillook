import React, {useContext} from "react";
import AuthContext from "../../Store/AuthContent";
import CreateBook from "./CreateBook";
import Bill from "../../Assets/homepg_img.jpg";
import LQM from "../../Assets/left_quotation_mark.png";
import RQM from "../../Assets/right_quotation_mark.png";

function Homepage() {
    const auth = useContext(AuthContext);
    return (
        <>
            <div className="flex justify-between items-center mx-[8%] my-[8%]">
                <img src={Bill} alt="Bill" className="w-72 h-72" />
                <div className="mx-24 flex flex-wrap">
                    <img src={LQM} alt="LQM" className="justify-start w-8 h-8" />
                    <p className="w-full text-4xl font-bold text-[#EE7214] leading-loose px-4">Split Bills, Not Friendships.</p>
                    <p className="w-full text-xl leading-snug p-4">Welcome to Billook – where every penny is accounted for,
                        so your focus stays on the Moments, not the Math.
                    </p>
                    <img src={RQM} alt="RQM" className="ml-auto w-8 h-8" />
                </div>
            </div>
            { auth.isLoggedIn && <CreateBook />}
        </>
    )
}

export default Homepage;