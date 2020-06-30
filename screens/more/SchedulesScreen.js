import React from "react";
import { WebView } from "react-native-webview";

export default function SchedulesScreen() {
  return (
    <WebView
      source={{
        uri:
          "https://bart-pdf-schedules.s3-us-west-1.amazonaws.com/June+22+2020+WD+Service+for+All+Lines.pdf"
      }}
    />
  );
}
