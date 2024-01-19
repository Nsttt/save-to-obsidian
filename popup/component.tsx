import React, { useState } from "react";
import browser from "webextension-polyfill";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default () => {
  const [folder, setFolder] = useState("");
  const [tags, setTags] = useState([""]);

  function handleOnClick() {
    browser.storage.sync.set({ defaultFolder: folder, defaultTags: tags });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
