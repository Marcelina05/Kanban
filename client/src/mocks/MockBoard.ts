import Board from "models/Board"
import MockEntity from "./MockEntity"
import MockUser from "./MockUser"
import MockCard from "./MockCard"

const MockBoard: Board = {
  ...MockEntity,
  cards: [MockCard, MockCard, MockCard],
  owner: MockUser,
  title: 'Mock board title',
};

export default MockBoard;