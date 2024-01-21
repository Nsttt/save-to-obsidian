import React, { useState, useEffect } from "react";
import browser from "webextension-polyfill";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";

export default function Popup() {
  const [folder, setFolder] = useState("");
  const [tags, setTags] = useState<string[]>(["clippings"]);
  const [pendingTag, setPendingTag] = useState("");

  const addTag = () => {
    if (pendingTag && !tags.includes(pendingTag)) {
      setTags([...tags, pendingTag]);
      setPendingTag("");
    }
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> | undefined
  ) => {
    if (e) {
      if (e.key === "Enter" || e.key === "," || e.key === " ") {
        e.preventDefault();
        addTag();
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  function handleOnClick() {
    browser.storage.sync.set({ defaultFolder: folder, defaultTags: tags });
  }

  function recoverDefaults() {
    browser.storage.sync.get(["defaultFolder", "defaultTags"]).then((res) => {
      if (res.defaultTags) {
        setTags(res.defaultTags);
      }
      if (res.defaultFolder) {
        setFolder(res.defaultFolder);
      }
    });
  }

  useEffect(() => {
    recoverDefaults();
  }, []);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Save to Obsidian: Settings</CardTitle>
        <CardDescription>
          Set Vault name, folder name and tags to add on top of notes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                placeholder="/path/to/folder or no folder"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex">
                <Input
                  value={pendingTag}
                  onChange={(e) => setPendingTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="rounded-r-none"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-l-none border border-l-0"
                  onClick={addTag}
                >
                  Add
                </Button>
              </div>
              <div className="border rounded-md min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <button
                      type="button"
                      className="w-3 ml-2"
                      onClick={() => removeTag(tag)}
                    >
                      <XIcon className="w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleOnClick}>Save</Button>
      </CardFooter>
    </Card>
  );
}
