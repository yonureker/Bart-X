import React from "react";
import { WebView } from "react-native-webview";

export default function SchedulesScreen() {
  return (
    <WebView
      source={{
        uri:
          "https://www.bart.gov/schedules/pdf"
      }}
    />
  );
}
