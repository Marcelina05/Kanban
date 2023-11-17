import pb from "database/database";
import Collections from "enums/Collections";
import Colors from "enums/Colors";
import Category from "models/Category";
import { RecordService } from "pocketbase";

const service: RecordService = pb.collection(Collections.CATEGORY);

export const createCategory = async (name: string, color: Colors) => {
  const record = {
    name,
    color
  };

  return service.create(record);
}

export const getAllCategories = async (): Promise<Category[]> => {
  return service.getFullList();
}

export const updateCategory = async (id: string, category: Category) => {
  return service.update(id, category);
}

export const deleteCategory = async (id: string): Promise<boolean> => {
  return service.delete(id);
}