import "react";
import { Show, SignIn, SignUp } from "@clerk/react";

export function AuthenticationPage() {
  return (
    <div className="auth-container">
      Helo World
      <Show when="signed-out">
        <SignIn routing="path" path="/sign-in" />
        <SignUp routing="path" path="/sign-up" />
      </Show>
      <Show when="signed-in">
        <div className="redirect-message">
          <p>You are already signed in.</p>
        </div>
      </Show>
    </div>
  );
}
