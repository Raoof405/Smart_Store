import React, { ChangeEvent, FormEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { axiosIns } from "@/app/config/axios/axios";
import { toast } from "react-toastify";
import pusherJs from "pusher-js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const handleClickShowPassword = () => {
     setShowPassword((prev) => !prev);
   };

   const handleMouseDownPassword = (
     event: React.MouseEvent<HTMLButtonElement>
   ) => {
     event.preventDefault();
   };

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // try {
    //   const res = await axiosIns.post("/auth/login", formData);
    //   const token = res.data.token;
    //   localStorage.setItem("token", token);
    //   window.location.href = "/";
    //   console.log("Token:", token); // Print the token to the console
    //   toast.success("تم التوصيل");
    // } catch (error) {
    //   toast.error("حدث خطأ اثناء عميلة الدخول");

    //   console.error("Error during login:", error); // Print any error to the console
    //   setError(true);
    // } finally {
    //   setLoading(false);
    // }

    await axiosIns
      .post("/auth/login", formData)
      .then((res) => {
        window.location.href = "/";
        localStorage.setItem("token", res.data.authorization.token);
        console.log("token", res.data.authorization.token);
        console.log(res.data);
        toast.success("تم التوصيل");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("حدث خطأ اثناء عميلة الدخول");
        // setError(true);
        setLoading(false);
      });
  };


  return (
    <div className="bg-[#171E27] ">
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-50 dark:text-white">
                Smart Store
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                تسجيل الدخول لحسابك{" "}
              </p>
            </div>

            <div className="mt-8">
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex justify-center items-center flex-col gap-5"
              >
                <TextField
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full"
                  id="outlined-basic1"
                  label="البريد الالكتروني"
                  variant="outlined"
                />
                <div className="w-full flex justify-end items-end flex-col">
                  <a
                    href="#"
                    className="text-sm mb-2 text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    نسيت كلمة المرور ؟
                  </a>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full "
                    id="outlined-basic2"
                    label="كلمة المرور"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
{/* 
                  <TextField
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full "
                    id="outlined-basic2"
                    label="كلمة المرور"
                    variant="outlined"
                  /> */}
                </div>
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <Button type="submit" className="w-full" variant="contained">
                    تسجيل الدخول
                  </Button>
                )}
                {error && <span> حدث خطأ في الايميل او كلمة المرور</span>}
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <a
                  href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className='h-screen flex justify-center items-center'>
    //     <div className="w-full max-w-2xl pt-16  mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">

    //         <div className="px-6 py-4">
    //             <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Brand</h2>

    //             <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

    //             <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

    //             <form>
    //                 <div className="w-full mt-4">

    //                     <TextField name='username' onChange={(e) => setForm((oldVal) => ({ ...oldVal, [e.target.name]: e.target.value }))} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />

    //                 </div>

    //                 <div className="w-full mt-4">
    //                     <TextField name='password' onChange={(e) => setForm((oldVal) => ({ ...oldVal, [e.target.name]: e.target.value }))} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
    //                 </div>

    //                 <div className="flex items-center justify-between mt-4">
    //                     <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>

    //                     <button className="px-4 py-2 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
    //                         type="button"   >Login</button>
    //                 </div>
    //             </form>
    //         </div>

    //         <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
    //             <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

    //             <a href="#" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
    //         </div>
    //     </div>

    // </div>
  );
}

export default Login;


  // useEffect(() => {
  //   // const pusher = new Pusher(pusherAppKey, {
  //   //   // cluster: pusherCluster,
  //   //   cluster: 'eu',
  //   // });

  //   // const channel = pusher.subscribe(
  //   //   "notifications.product_catches_from_a_shelf"
  //   // );
  //   // channel.bind("my-event", (data: { time: number; className: string }) => {
  //   //   setAiDetections((prevDetections) => [...prevDetections, data]);
  //   // });

  //   // return () => {
  //   //   pusher.unsubscribe("video-channel");
  //   // };

  //   // Enable pusher logging - don't include this in production
  //   pusherJs.logToConsole = true;

  //   var pusher = new pusherJs("32f7bb277f8766b86351", {
  //     cluster: "eu",
  //   });
  //   // Assuming you know the notification type beforehand or can dynamically determine it
  //   var channelName = "notifications.product_catches_from_a_shelf"; // Example channel name
  //   var eventName = "my-event"; // Event name is typically the class name
  //   var channel = pusher.subscribe(channelName);
  //   channel.bind(eventName, function () {
  //     alert(JSON.stringify("iiiiii"));
  //   });
  // }, []);
