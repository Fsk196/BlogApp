import React, { useRef } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { GoPaperAirplane } from "react-icons/go";

const CopyUrl = ({ slug }) => {
  const urlRef = useRef(null);

  const copyUrl = () => {
    window.navigator.clipboard.writeText(`${window.location.href}blog/${slug}`);
    urlRef.current?.select();
    // alert("Url Copied");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-transparent">
          <GoPaperAirplane className="text-2xl cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black border-none shadow shadow-gray-300/10 text-white">
        <DialogHeader>
          <DialogTitle>Copy URL</DialogTitle>
          <DialogDescription>
            Copy the URL below to share this page with others.
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="url">URL</Label>
        {/* <Input id="url" value={window.location.href} readOnly /> */}
        <Input
          id="url"
          value={`${window.location.href}blog/${slug}`}
          ref={urlRef}
          readOnly
        />
        <DialogFooter>
          <Button onClick={copyUrl}>Copy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CopyUrl;
