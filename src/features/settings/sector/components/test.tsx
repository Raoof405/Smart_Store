import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  ShapeEditor,
  ImageLayer,
  DrawLayer,
  wrapShape,
} from "react-shape-editor";
import upload_icon from "../../../../assets/images/download.jfif";
import { UploadFile, UploadFileOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

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

const Editor: React.FC = () => {
  const [items, setItems] = useState<ShapeItem[]>([
    // { id: "1", x: 20, y: 120, width: 145, height: 140 },
  ]);

  console.log(items);

  const [file, setFile] = useState<string | null>(null);

  const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
    vectorHeight: 0,
    vectorWidth: 0,
  });

  const uploadIconStyle: React.CSSProperties = {
    display: "inline",
    width: 500,
    height: 500,
  };

  // File change handler
  const fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      setFile(e.target?.result as string);
    };

    reader.readAsDataURL(selectedFile);
  };
  const [isIconVisible, setIsIconVisible] = useState(true);

  return (
    <div className="flex flex-row justify-center">
      <div>
        {isIconVisible && (
          <>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{ fontSize: "2rem" }}
            >
              <input
                id="fileInput"
                hidden
                accept="image/*"
                type="file"
                onChange={fileChangedHandler}
              />
              <UploadFileOutlined fontSize="inherit" />
            </IconButton>
          </>
        )}
      </div>

      <div>
        <ShapeEditor
          style={uploadIconStyle}
          vectorWidth={vectorWidth}
          vectorHeight={vectorHeight}
        >
          <ImageLayer
            src={file || upload_icon}
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
      </div>
    </div>
  );
};

export default Editor;
