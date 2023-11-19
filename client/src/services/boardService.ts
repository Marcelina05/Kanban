import { ownerDocument } from "@mui/material";
import pb from "database/database";
import Collections from "enums/Collections";
import Board from "models/Board";
import { FullListOptions, RecordOptions, RecordService } from "pocketbase";
import { promoteNestedObject } from "utils/EntityUtils";

const service: RecordService = pb.collection(Collections.BOARD);

export const createBoard = async (title: string, ownerId: string) => {
  const record = {
    title,
    cards: [],
    owner: ownerId
  };

  return service.create(record);
}

export const getAllBoards = async (ownerId: string, search: string = ''): Promise<Board[]> => {
  const options: FullListOptions = {
    filter: `owner='${ownerId}'${!!search ? `&&title~'${search}'` : ''}`,
  }

  return service.getFullList(options);
}

export const getBoard = async (ownerId: string, boardId: string): Promise<Board> => {
  const options: RecordOptions = {
    expand: 'cards',
    filter: `owner='${ownerId}'`,
  }

  const fetched = await service.getOne(boardId, options);
  const board = (!!fetched.expand ? promoteNestedObject(fetched, 'expand') : fetched) as unknown as Board;
  board.cards.sort((a, b) => a.order - b.order);
  return board;
}

export const updateBoard = async (id: string, board: Board) => {
  return service.update(id, board);
}

export const deleteBoard = async (id: string): Promise<boolean> => {
  return service.delete(id);
}