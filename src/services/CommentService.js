import { baseService } from "./baseService";

export class CommentService extends baseService {
  constructor() {
    super();
  }

  getAllComment = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };

  createComment = (commentObject) => {
    return this.post("Comment/insertComment", commentObject);
  };

  deleteComment = (idComment) => {
    return this.delete(`Comment/deleteComment?idComment=${idComment}`);
  };

  updateComment = (id, contentComment) => {
    return this.putOnlyUrl(
      `Comment/updateComment?id=${id}&contentComment=${contentComment}`
    );
  };
}

export const commentService = new CommentService();
