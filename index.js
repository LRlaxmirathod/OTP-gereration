class OTPSystem {
    constructor(otpLength = 6, expirationTime = 300000) { // 5 minutes in milliseconds
      this.otpLength = otpLength;
      this.expirationTime = expirationTime;
      this.otp = null;
      this.generatedTime = null;
    }
  
    // Generate a secure random OTP
    generateOTP() {
      let otp = '';
      for (let i = 0; i < this.otpLength; i++) {
        otp += Math.floor(Math.random() * 10);  // Generate a random digit between 0 and 9
      }
      this.otp = otp;
      this.generatedTime = Date.now(); // Store the generation time
      console.log(`Generated OTP: ${this.otp}`); // For testing purposes
      return this.otp;
    }
  
    // Validate the OTP provided by the user
    validateOTP(userOTP) {
      const currentTime = Date.now();
  
      // Check if OTP was generated
      if (!this.otp) {
        return { success: false, message: "OTP not generated yet." };
      }
  
      // Check if OTP has expired
      if (currentTime - this.generatedTime > this.expirationTime) {
        return { success: false, message: "OTP has expired." };
      }
  
      // Validate the OTP
      if (userOTP === this.otp) {
        return { success: true, message: "OTP is valid!" };
      } else {
        return { success: false, message: "Invalid OTP." };
      }
    }
  
    // Helper function to check if input is a valid 6-digit number
    isValidInput(input) {
      return /^\d{6}$/.test(input);
    }
  }
  
  // Example Usage:
  const otpSystem = new OTPSystem();
  otpSystem.generateOTP(); // Generates a random OTP
  
  // Simulating OTP input after 10 seconds
  setTimeout(() => {
    const userOTP = prompt("Enter the OTP:"); // Ask user for OTP
  
    if (otpSystem.isValidInput(userOTP)) { // Validate user input
      const validation = otpSystem.validateOTP(userOTP);
      console.log(validation.message);
    } else {
      console.log("Invalid input. Please enter a 6-digit OTP.");
    }
  }, 10000);  // Validate OTP after 10 seconds
  