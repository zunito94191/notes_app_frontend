import React, { Dispatch, ElementType, MutableRefObject, SetStateAction } from "react";

export interface CollabType {
  role?: string;
}
export interface CollaboratorType {
  name: string;
  photo: string | null;
  email?: string;
  collab?: CollabType;
  role?: string;
}

export interface NoteType {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  users: CollaboratorType[];
  readOnly: boolean | null;
}

export interface NoteFunctionType {
  (note: NoteType, index?: number): void;
}

export interface NotePropType {
  note: NoteType;
}

export interface PropType {
  notes: NoteType[];
  setActiveNote: NoteFunctionType;
  activeIndex: number;
  addNote: NoteFunctionType;
  removeNote: AuthFunctionType;
  updateNote: UpdateIdType;
}
// export interface MobileType {
//   notes: NoteType[];
//   setActiveNote: NoteFunctionType;
//   activeIndex: MutableRefObject;
//   addNote: NoteFunctionType;
//   removeNote: AuthFunctionType;
//   updateNote: UpdateIdType;
// }
export interface UpdateIdType {
  (noteId: number): void;
}

export interface authType {
  setAuthType: Dispatch<SetStateAction<string>>;
  setUserID: Dispatch<SetStateAction<string | null>>;
}

export interface SidebarHeaderProps {
  addNote: NoteFunctionType;
  removeNote: AuthFunctionType;
  updateNote: UpdateIdType;
}

export interface HyperType {
  authFunction: Dispatch<SetStateAction<string>>;
  color: string;
  label: string;
  location: string;
}
export interface AuthFunctionType1 {
  (): string;
}
export interface User {
  name: string;
  email: string;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface SetterFunctionType {
  (value: string, index: number): void;
}
export interface authResponse {
  status: string;
  token: string;
  user: User;
}
export interface AuthFunctionType {
  (): void;
}
export interface AuthLogout{
  logout:AuthFunctionType
}

export interface ButtonPropType {
  label: string;
  authFunction: AuthFunctionType;
  color?: string;
}

export interface InputType {
  label: string;
  type: string;
  currentValue: string;
  setterFunction: Dispatch<SetStateAction<string>>;
}

export interface ItemType {
  title: string;
  body?: string;
  date?: string;
  isActive?: boolean;
}

export interface ModalProps {
  show?: boolean;
  children: React.ReactNode;
}

export interface DropdownProp {
  options: SelectType[];
}

export interface SelectType {
  label: string;
  value: string;
}

export interface StateSetter {
  setValue: Dispatch<SetStateAction<any>>;
  value?: any;
}

export interface StateForget{
  setUserId: Dispatch<SetStateAction<any>>;
  value?: any;
  setSpinner:Dispatch<SetStateAction<boolean>>;
}

export interface ForgotPasswordProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setGenerated: Dispatch<SetStateAction<boolean>>;
}
