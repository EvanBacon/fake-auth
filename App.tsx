import React from "react";
import { Button, Linking, Text, View } from "react-native";
import { H1, H3 } from "@expo/html-elements";

export default function FakeAuth() {
  const [redirectUrl, setRedirect] = React.useState<string | null>(null);

  const redirect = (inputRedirectUrl: string = redirectUrl) => {
    const parsed = new URL(window.location.href);

    const state = parsed.searchParams.get("state");

    Linking.openURL(`${inputRedirectUrl}?state=${state}&code=some-fake-code`);
  };

  React.useEffect(() => {
    const parsed = new URL(window.location.href);
    const redirectUrl = decodeURIComponent(
      parsed.searchParams.get("redirect_uri") ?? ""
    );
    setRedirect(redirectUrl);
    const prompt = parsed.searchParams.get("prompt");
    if (prompt === "none") {
      redirect(redirectUrl);
    }
  }, []);
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <H1>Welcome to fake auth!</H1>
      <H3>
        Will redirect to:{" "}
        <Text style={{ color: "blue", fontWeight: "bold" }}>{redirectUrl}</Text>
      </H3>
      <Button
        onPress={() => {
          redirect();
        }}
        title="Sign In"
      />
      <Text>Use 'prompt=none' to automatically redirect.</Text>
    </View>
  );
}
