import { ID, Query } from "appwrite";
import { appwriteConfig, client, databases, storage } from "./appwrite";

export const createPost = async ({
  title,
  content,
  image,
  status,
  userId,
  date,
  subtitle,
  slug,
}) => {
  try {
    //Upload image to appwrite Storage
    const uploadImage = await uploadFile(image);
    if (!uploadImage) {
      throw new Error("Failed to upload image");
    }

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.articleCollectionId,
      slug,
      {
        title,
        content,
        image: uploadImage.$id,
        status,
        userId,
        date,
        subtitle,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (
  slug,
  { title, content, image, status, date, subtitle }
) => {
  try {
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.articleCollectionId,
      slug,
      {
        title,
        content,
        image,
        status,
        date,
        subtitle,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (slug) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.articleCollectionId,
      slug
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getPost = async (slug) => {
  try {
    return await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.articleCollectionId,
      slug
    );
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (
  page = 1,
  limit = 10,
  queries = [
    Query.equal("status", true),
    Query.orderDesc("date"),
    Query.limit(limit),
  ]
) => {
  const offset = (page - 1) * limit;
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.articleCollectionId,
      queries
    );
    return response.documents;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("userId", userId)]
    );
    return user.documents[0]; // Assuming userId is unique
  } catch (error) {
    console.log(error);
    return null;
  }
};

// file upload Methods

export const uploadFile = async (file) => {
  try {
    return await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteFile = async (fileId) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getFilePreview = async (fileId) => {
  try {
    const fileUrl = await storage.getFilePreview(
      appwriteConfig.storageId,
      fileId
    );
    return fileUrl.href;
  } catch (error) {
    console.log(error);
  }
};
