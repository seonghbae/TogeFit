import PostForm from './components/PostForm';

import * as SC from './BoardModifyPageStyle';

const PostPage: React.FC = () => {
  console.log('test');
  return (
    <SC.Wrapper>
      <div>
        <PostForm />
      </div>
    </SC.Wrapper>
  );
};

export default PostPage;
