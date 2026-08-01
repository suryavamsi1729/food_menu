import { useState } from "react";

const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showPassword,
    inputType: showPassword ? "text" : "password",
    togglePassword,
  };
};

export default usePasswordToggle;