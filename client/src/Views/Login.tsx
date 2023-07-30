import { Link } from "react-router-dom";
import banner from "../assets/loginBanner.jpg";
import axios from "axios";
interface LoginProps {
  type: string;
}
const Login: React.FC<LoginProps> = ({ type }) => {
  // const loginFunction = () => {};
  const registerFunction = async () => {
    const res = await axios.post("http://localhost:5000/auth/register", {
      userName: "chintuMintu",
      email: "chintu@gmail.com",
      password: "1234567890",
      role: "admin",
      name: "chintu Shukla",
    });
    console.log(res.data);
  };
  return (
    <>
      <div className="h-[80vh] w-[80vw] flex font-monster shadow-md rounded-md">
        <div className="w-[50%] bg-black/40 rounded-l-md">
          <img src={banner} alt="" className="h-full object-cover" />
        </div>
        <div className="w-[50%] bg-white text-black flex flex-col items-center gap-10 p-2 rounded-r-md">
          <div>
            <p className="text-8xl font-extrabold">DevFlow</p>
          </div>
          {type === "login" && (
            <div className="flex-grow w-[100%]  p-2 flex flex-col items-center gap-5">
              <div className="h-[55px] border w-[90%] rounded-sm p-2">
                <input
                  type="email"
                  className="h-full w-full outline-none"
                  placeholder="Email"
                />
              </div>
              <div className="h-[55px] border w-[90%] rounded-sm p-2">
                <input
                  type="password"
                  className="h-full w-full outline-none"
                  placeholder="Password"
                />
              </div>
              <div className="h-[55px] border w-[90%] rounded-sm p-2 flex justify-center items-center bg-black text-xl text-white font-semibold cursor-pointer hover:bg-black/80 transition-all duration-200">
                Login
              </div>
              <p>
                Dont have an account?{" "}
                <span className="text-blue-600">
                  <Link to="/register">Sign Up</Link>
                </span>
              </p>
            </div>
          )}
          {type === "register" && (
            <div className="flex-grow w-[100%]  p-2 flex flex-col items-center gap-5">
              <div className="h-[55px] border w-[90%] rounded-sm p-2">
                <input
                  type="text"
                  className="h-full w-full outline-none"
                  placeholder="Name"
                />
              </div>
              <div className="h-[55px] border w-[90%] rounded-sm p-2">
                <input
                  type="email"
                  className="h-full w-full outline-none"
                  placeholder="Email"
                />
              </div>
              <div className="h-[55px] border w-[90%] rounded-sm p-2">
                <input
                  type="password"
                  className="h-full w-full outline-none"
                  placeholder="Password"
                />
              </div>
              <div className="h-[55px] border w-[90%] rounded-sm p-2">
                <input
                  type="password"
                  className="h-full w-full outline-none"
                  placeholder="Confirm Password"
                />
              </div>
              <div
                className="h-[55px] border w-[90%] rounded-sm p-2 flex justify-center items-center bg-black text-xl text-white font-semibold cursor-pointer hover:bg-black/80 transition-all duration-200"
                onClick={() => {
                  registerFunction();
                }}
              >
                Register
              </div>

              <p>
                Already have an account?{" "}
                <span className="text-blue-600">
                  <Link to="/login">Log In</Link>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
