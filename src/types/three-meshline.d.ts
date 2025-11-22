import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    type IntrinsicElements = {
      meshLineGeometry: any;
      meshLineMaterial: any;
    };
  }
}

declare module "@react-three/fiber" {
  type ThreeElements = {
    meshLineGeometry: any;
    meshLineMaterial: any;
  };
}
