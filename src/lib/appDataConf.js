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
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.articleCollectionId,
      slug,
      {
        title,
        content,
        image,
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

export const getPosts = async (queries = [Query.equal("status", "active")]) => {
  try {
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.articleCollectionId,
      queries
    );
  } catch (error) {
    console.log(error);
    return false;
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
    return true
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getFilePreview = async (fileId) => {
  try {
    return storage.getFilePreview(
      appwriteConfig.storageId,
      fileId
    )
  } catch (error) {
    console.log(error);
  }
}