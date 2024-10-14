import { useState } from "react";

export const SignUpFrom = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("test");
  };
  return (
    <form onSubmit={handleSignup}>
      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input input-bordered w-full required:"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>
    </form>
  );
};
