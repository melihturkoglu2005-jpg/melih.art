import { create } from "zustand"
import profileData from "../data/profile.json"

interface ISocial {
  platform: string;
  link: string;
}

interface IProfileStore {
  email: string;
  fullName: string;
  avatar: string;
  cvLink: string;
  social: ISocial[];
}

export const useProfileStore = create<IProfileStore>(() => {
  return {
    email: profileData.profile.email,
    fullName: profileData.profile.full_name,
    avatar: profileData.profile.avatar,
    cvLink: profileData.profile.cv_link,
    social: profileData.profile.social
  }
})