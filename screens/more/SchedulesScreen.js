import React from "react";
import { WebView } from "react-native-webview";

export default function SchedulesScreen() {
  return (
    <WebView
      source={{
        uri:
          "https://www.bart.gov/sites/default/files/docs/June%2022%202020%20WD%20Service%20for%20All%20Lines.pdf"
      }}
    />
  );
}
