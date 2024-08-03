import styled from "@emotion/styled";
import React, { ChangeEvent, useId, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SERVER_URL } from "@/app/config/app.config";
import { IconButton } from "@mui/material";
import { Close, FileUploadOutlined } from "@mui/icons-material";
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  wrapShape,
} from "react-shape-editor";
import upload_icon from "../../../public/logo-192_x_192.png";

interface ShapeItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Util Function for replacing items in an array
function arrayReplace<T>(arr: T[], index: number, item: T | T[]): T[] {
  return [
    ...arr.slice(0, index),
    ...(Array.isArray(item) ? item : [item]),
    ...arr.slice(index + 1),
  ];
}

// Rectangle Shape
const RectShape = wrapShape(
  ({ width, height }: { width: number; height: number }) => (
    <rect width={width} height={height} fill="rgba(0,0,255,0.5)" />
  )
);

let idIterator = 1;

type Props = {
  onChange: (payload: File | null) => void;
  onChangeUrl: (url: string) => void;
  value?: File | null;
  url: string;
  name: string;
  label?: string;
  className?: string;
};

const Label = styled.label`
  border: 1px dashed #cccccc;
  width: 100%;
  min-height: 100px;
  cursor: pointer;
`;

const uploadIconStyle: React.CSSProperties = {
  display: "initial",

  width: 250,
  height: 500,
};

const ImageUpload = React.forwardRef<HTMLInputElement, Props>(
  (
    { onChange, onChangeUrl, value, url, name, label, className, ...rest },
    ref
  ) => {
    const id = useId();

    const [fileUrl, setFileUrl] = useState<string | null>(null);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      if (event.target.files) {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        onChange(file);
        onChangeUrl(url);
        setFileUrl(url);
        
      }
    }

    function reset() {
      onChange(null);
      onChangeUrl("");
      setFileUrl(null);
    }

    const [items, setItems] = useState<ShapeItem[]>([
      // { id: "1", x: 20, y: 120, width: 145, height: 140 },
    ]);

    const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
      vectorHeight: 0,
      vectorWidth: 0,
    });

    return (
      <>
        <div className="flex justify-between items-center">
          {label && <label className="my-2">{label}</label>}
          {value && (
            <IconButton size="small" sx={{ my: 1 }} onClick={reset}>
              <Close />
            </IconButton>
          )}
        </div>
        <Label
          className={`text-center flex w-full  items-center justify-center relative ${className}`}
          htmlFor={`input-file-${id}`}
        >
          {url || fileUrl ? (
            <ShapeEditor
              style={uploadIconStyle}
              vectorWidth={vectorWidth}
              vectorHeight={vectorHeight}
            >
              <ImageLayer
                src={fileUrl || upload_icon}
                // alt={"Uploaded image"}
                // style={uploadIconStyle}
                // responsive
                onLoad={({ naturalWidth, naturalHeight }) => {
                  setVectorDimensions({
                    vectorWidth: naturalWidth,
                    vectorHeight: naturalHeight,
                  });
                }}
              />
              <DrawLayer
                onAddShape={({ x, y, width, height }) => {
                  setItems((currentItems) => [
                    ...currentItems,
                    { id: `id${idIterator}`, x, y, width, height },
                  ]);
                  idIterator += 1;
                }}
              />
              {items.map((item, index) => {
                const { id, height, width, x, y } = item;
                return (
                  <RectShape
                    key={id}
                    shapeId={id}
                    height={height}
                    width={width}
                    x={x}
                    y={y}
                    onChange={(newRect) => {
                      setItems((currentItems) =>
                        arrayReplace(currentItems, index, {
                          ...item,
                          ...newRect,
                        })
                      );
                      console.log(newRect);
                    }}
                    onDelete={() => {
                      setItems((currentItems) =>
                        arrayReplace(currentItems, index, [])
                      );
                    }}
                  />
                );
              })}
            </ShapeEditor>
          ) : (
            <span>اختر صورة لرفعها</span>
          )}
        </Label>
        <input
          ref={ref}
          placeholder="input"
          name={name}
          className="hidden"
          id={`input-file-${id}`}
          type="file"
          onChange={handleChange}
        />
      </>
    );
  }
);

export default ImageUpload;
