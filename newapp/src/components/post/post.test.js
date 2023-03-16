import { render, screen, fireEvent } from "@testing-library/react";
import Post from "./Post";

const mockPost = {
  postId: 1,
  post_title: "Test Post",
  post_type: "Test Type",
  post_description: "Lorem ipsum dolor sit amet",
  user_id: 1,
};

const mockUserInfo = {
  id: 1,
  username: "testuser",
};

const mockPosts = [
  {
    postId: 1,
    post_title: "Test Post 1",
    post_type: "Test Type 1",
    post_description: "Lorem ipsum dolor sit amet 1",
    user_id: 1,
  },
  {
    postId: 2,
    post_title: "Test Post 2",
    post_type: "Test Type 2",
    post_description: "Lorem ipsum dolor sit amet 2",
    user_id: 2,
  },
];

const mockSetPosts = jest.fn();
const mockFeedMetric = {};
const mockSetFeedMetric = jest.fn();
const mockUser = { id: 1 };

jest.mock("../../context/appContext.jsx", () => ({
  useContext: () => ({
    posts: mockPosts,
    feedMetric: mockFeedMetric,
    setFeedMetric: mockSetFeedMetric,
    user: mockUser,
  }),
}));

describe("Post", () => {
  test("renders post title, type, and description", () => {
    render(<Post post={mockPost} userInfo={mockUserInfo} />);
    const title = screen.getByText("Test Post");
    const type = screen.getByText("Test Type");
    const description = screen.getByText("Lorem ipsum dolor sit amet");
    expect(title).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test("displays like and comment buttons", () => {
    render(<Post post={mockPost} userInfo={mockUserInfo} />);
    const likeButton = screen.getByLabelText("like");
    const commentButton = screen.getByLabelText("comment");
    expect(likeButton).toBeInTheDocument();
    expect(commentButton).toBeInTheDocument();
  });

  test("clicking like button updates like counter and button icon", () => {
    render(<Post post={mockPost} userInfo={mockUserInfo} />);
    const likeButton = screen.getByLabelText("like");
    const likeCounter = screen.getByText("0 Likes");
    fireEvent.click(likeButton);
    expect(likeButton).toHaveClass("MuiIconButton-colorPrimary");
    expect(likeCounter).toHaveTextContent("1 Like");
  });

  test("clicking comment button displays comment modal", () => {
    render(<Post post={mockPost} userInfo={mockUserInfo} />);
    const commentButton = screen.getByLabelText("comment");
    fireEvent.click(commentButton);
    const modalTitle = screen.getByText("Add a Comment");
    expect(modalTitle).toBeInTheDocument();
  });

  test("deleting post calls setPosts function with filtered posts", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
    render(
      <Post
        post={mockPost}
        userInfo={mockUserInfo}
        posts={mockPosts}
        setPosts={mockSetPosts}
      />
    );
  })
})