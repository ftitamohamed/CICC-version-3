document.addEventListener("DOMContentLoaded", () => {
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');
  const loginButton = document.getElementById("Login");
  const logoButton = document.getElementById("home-logo");
  const logoButton1 = document.getElementById("home-logo1");
  
  // Toggle UI panels
  signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
  });

  signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
  });

  // Redirect on login button click
 /*  loginButton.addEventListener("click", () => {
      window.location.href = "../Home/home.html"; // Replace with your desired URL
  }); */

  // Redirect on logo click
  logoButton.addEventListener("click", () => {
      window.location.href = "index.html"; // Replace with your desired URL
  });
  logoButton1.addEventListener("click", () => {
    window.location.href = "index.html"; // Replace with your desired URL
});
  // Login form submission
  const loginForm = document.querySelector(".sign-in-container form");

  loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the form from reloading the page

      // Get input values
      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;

      try {
          const response = await fetch("https://custmize.digitalgo.net/api/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Accept-Language": "ar"
              },
              body: JSON.stringify({ email, password })
          });

          if (response.ok) {
              const data = await response.json();
              console.log("Login successful:", data);
              alert("تم تسجيل الدخول بنجاح!");
              window.location.href = "index.html";  // Redirect after login 
              
                const { name, token } = data.data;
                localStorage.setItem('userName', name);
                localStorage.setItem('accessToken', token);
                console.log("User name and token saved to localStorage");
            
              
          } else {
              const error = await response.json();
              console.error("Login failed:", error);
              alert("فشل تسجيل الدخول: " + (error.message || "خطأ غير معروف"));
          }
      } catch (error) {
          console.error("An error occurred:", error);
          alert("حدث خطأ أثناء تسجيل الدخول.");
      }
  });
});
/* document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.querySelector(".sign-up-container form");

    signUpForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        // Get input values
        const name = signUpForm.querySelector('input[placeholder="إسم المستخدم"]').value;
        const email = signUpForm.querySelector('input[placeholder="الإيمايل"]').value;
        const password = signUpForm.querySelector('input[placeholder="كلمة السر"]').value;
        const confirmPassword = signUpForm.querySelector('input[placeholder="تأكيد كلمة السر "]').value;

        try {
            const response = await fetch("https://custmize.digitalgo.net/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": "ar"
                },
                body: JSON.stringify({
                    email,
                    password,
                    "confirm-password": confirmPassword,
                    name
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Account created successfully:", data);
                alert("تم إنشاء الحساب بنجاح!");
                // Redirect or handle post-registration success
                window.location.href = "index.html"; // Replace with your desired page
            } else {
                const error = await response.json();
                console.error("Account creation failed:", error);
                alert("فشل إنشاء الحساب: " + (error.message || "خطأ غير معروف"));
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("حدث خطأ أثناء إنشاء الحساب.");
        }
    });
}); */

document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.querySelector(".sign-up-container form");

    signUpForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        // Get input values
        const name = signUpForm.querySelector('input[placeholder="إسم المستخدم"]').value.trim();
        const email = signUpForm.querySelector('input[placeholder="الإيمايل"]').value.trim();
        const password = signUpForm.querySelector('input[placeholder="كلمة السر"]').value.trim();
        const confirmPassword = signUpForm.querySelector('input[placeholder="تأكيد كلمة السر "]').value.trim();

        if (!name || !email || !password || !confirmPassword) {
            alert("الرجاء ملء جميع الحقول.");
            return;
        }

        try {
            const response = await fetch("https://custmize.digitalgo.net/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": "ar"
                },
                body: JSON.stringify({
                    email,
                    password,
                    confirm_password: confirmPassword,
                    name
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Account created successfully:", data);

                alert(data.message); // Show success message

                // Dynamically create OTP verification popup
                const otpPopupHTML = `
                    <div class="otp-popup">
                        <div class="otp-popup-content">
                            <h2>تم إنشاء الحساب بنجاح</h2>
                            <p>${data.message}</p>
                            <p>يرجى إدخال رمز التفعيل المرسل إلى بريدك الإلكتروني.</p>
                            <input type="text" id="otp-input" placeholder="أدخل رمز التفعيل" />
                            <button id="submit-otp">تأكيد الرمز</button>
                            <div id="timer">01:30</div>
                        </div>
                    </div>
                `;
                
                document.body.insertAdjacentHTML('beforeend', otpPopupHTML);

                // Start countdown timer
                let timer = 90; // 1 minute 30 seconds
                const timerDiv = document.getElementById("timer");
                const countdown = setInterval(() => {
                    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
                    const seconds = (timer % 60).toString().padStart(2, "0");
                    timerDiv.textContent = `${minutes}:${seconds}`;
                    if (timer === 0) {
                        clearInterval(countdown);
                        alert("انتهى الوقت! الرجاء المحاولة مرة أخرى.");
                    }
                    timer--;
                }, 1000);

                // Handle OTP submission
                document.getElementById("submit-otp").addEventListener("click", async () => {
                    const otp = document.getElementById("otp-input").value.trim();
                    if (!otp) {
                        alert("الرجاء إدخال رمز التفعيل.");
                        return;
                    }

                    try {
                        const otpResponse = await fetch("https://custmize.digitalgo.net/api/verify_otp", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept-Language": "ar"
                            },
                            body: JSON.stringify({
                                otp,
                                email: data.data.email // Use the email from the registration response
                            })
                        });

                        if (otpResponse.ok) {
                            const otpData = await otpResponse.json();
                            console.log("OTP verified successfully:", otpData);
                            alert("تم تفعيل الحساب بنجاح!");
                            window.location.href = "index.html"; // Redirect to home page
                        } else {
                            const otpError = await otpResponse.text();
                            console.error("OTP verification failed:", otpError);
                            alert("فشل تأكيد الرمز: " + otpError);
                        }
                    } catch (error) {
                        console.error("An error occurred during OTP verification:", error);
                        alert("حدث خطأ أثناء تأكيد الرمز.");
                    }
                });
            } else {
                const error = await response.json();
                console.error("Account creation failed:", error);
                alert("فشل إنشاء الحساب: " + (error.message || "خطأ غير معروف"));
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("حدث خطأ أثناء إنشاء الحساب.");
        }
    });
});





