# **TogeFit**

### **프로젝트 한줄 소개**

식단과 운동 등 건강 관리에 관련된 정보들을 공유할 수 있는 커뮤니티

### **서비스 설명**

##### 1. 기획 의도, 목적

- 자신의 운동, 식단 기록을 추가, 수정, 삭제하여 관리하고, 다른 사람과 공유할 수 있는 사이트를 제작하고자 하였습니다.
- 요즘 투두 리스트 앱이 다른 사람과 내용을 공유할 수 있도록 제작되고 있습니다. 사용자들이 다른 사람이 공유한 내용들을 보면서 동기부여를 받을 수 있도록 하는 것이 앞서 언급한 서비스의 장점입니다. 운동이나 식단 관리 같은 경우에도 동기부여와 끈기가 필요하기 때문에 서로 기록을 공유하는 서비스를 제공하고자 하였습니다.
- 개인 간에 운동, 식단을 기록하여 관리하고 자신의 기록을 월 별 잔디 캘린더로 표시하여 확인할 수 있게 함으로써 스스로 동기부여 할 수 있는 사이트를 제작하고자 하였습니다.
- 본인의 기록을 남과 공유함으로써 커뮤니케이션이 가능하고, 다른 사람의 기록을 확인하면서 정보 또한 쉽게 얻을 수 있는 커뮤니티를 제작하고자 하였습니다.

##### 2. 웹 서비스의 최종적인 메인 기능과 서브 기능 설명

- 주제: 운동을 하는 사람들끼리 정보를 공유할 수 있고, 자신이 한 운동과 식단을 기록하면서 동기부여를 받을 수 있는 웹 서비스
- 메인 기능
  1. 자신이 한 운동과 식단에 대한 글쓰기, 수정, 삭제 및 다른 사람들과 공유
     - 다른 사람들의 글에 댓글을 달거나, 좋아요를 눌러 소통을 할 수 있습니다.
     - 나 외에 다른 사람의 운동과 식단에 대한 정보를 알 수 있습니다.
  2. 잔디 캘린더에 운동한 날이 체크되는 기능
     - 본인의 게시글 관리 페이지에서 게시글을 작성함으로써 캘린더에 흔적을 남길 수 있습니다.
  3. 자신만의 운동 루틴 생성, 수정, 삭제
     - 나만의 운동 루틴을 저장하여 지속적으로 재사용할 수 있습니다.
  4. 식단 기록 생성, 수정, 삭제
     - 자신이 기록한 식단 정보와 비율을 차트를 통해 확인할 수 있습니다.
- 서브 기능
  1. 무한스크롤을 사용한 게시글 조회
  2. drag & drop을 이용한 루틴과 식단의 배치
  3. 식단에 대한 영양소 비율 계산

##### 3. 프로젝트만의 차별점, 기대 효과

- 개인이 운동이나 식단을 관리하는 앱 등은 기존에도 있었지만, 게시판을 통해 서로의 운동이나 식단 정보를 공유하는 서비스는 없었기 때문에 이 서비스를 통해 운동 관리 기능과 식단 관리 기능을 동시에 제공할 수 있습니다.
- 사용자가 개인의 운동과 식단을 기록하여 파이 차트로 시각화하여 관리할 수 있습니다. 식단 관리를 본격적으로 하는 사람들은 본인이 섭취한 영양소의 비율이 중요하기 때문에 유용하게 작용할 수 있습니다.
- 게시글을 통해 다른 사람과 운동, 식단을 공유함으로써 정보를 주고 받기 쉬워집니다.

##### 4. 프로젝트 구성

![service-diagram](https://team-16-s3.s3.ap-northeast-2.amazonaws.com/service-diagram.jpg)

- 사용 스택
  - 프론트엔드
    - React
    - TypeScript
    - Axios
    - Recoil
    - Styled-Components
  - 백엔드
    - Express, Node
    - Mongoose, multer
    - AWS S3
    - Jest
    - Docker
- 와이어프레임 (https://www.figma.com/file/d5a5IZkK1xqnN5Hf5G7a6C/Team-16?node-id=0%3A1)
- 스토리보드 및 유저 시나리오
  - 사용자는 사이트 진입 시 회원들의 게시글을 열람할 수 있다.
  - 사용자는 로그인 한 후 내 정보 페이지에서 프로필을 수정하거나 회원탈퇴 할 수 있다.
  - 사용자는 본인의 게시글 관리 페이지에서 루틴, 식단에 대한 기록을 추가, 수정, 삭제할 수 있다.
  - 사용자는 메인 페이지(게시판 페이지)에서 게시글 등록 시 추가된 루틴, 식단을 게시글에 연동하여 사용할 수 있다. 게시글 등록 시 잔디 캘린더에 초록색으로 표시된다.
  - 사용자는 본인의 게시글 관리 페이지에서 잔디 캘린더를 통해 기록 여부를 확인할 수 있다.
  - 사용자는 메인 페이지(게시판 페이지)로 이동하여, 다른 사람의 게시글 또한 확인할 수 있고 댓글을 추가, 수정, 삭제할 수 있다.
  - 사용자는 다른 사람의 게시글에 좋아요를 누를 수 있다.

##### 5. 구성원 역할

| 이름   | 역할         | 구현 기능                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 김미소 | 팀장, 백엔드 | 회원, 음식, 식단, 게시글 CRUD API, 테스트 코드 작성                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 김혜령 | 백엔드       | 회원, 운동, 루틴, 게시글 CRUD API, 테스트 코드 작성, Docker를 통한 배포                                                                                                                                                                                                                                                                                                                                                                                                   |
| 박노준 | 프론트엔드   | 유저 페이지 운동 / 식단 정보 탭 구현 + 무한 스크롤 적용, 운동 잔디 구현, 게시글 카드 컴포넌트 제작, 게시글 상세 보기 모달 제작, Nav 제작, 알림 모달 제작, 전체적인 버그 수정                                                                                                                                                                                                                                                                                              |
| 배성현 | 프론트엔드   | 음식, 식단 CRUD, 차트 시각화, 메인 페이지 개인정보                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 정진우 | 프론트엔드   | 전체 와이어프레임 제작, 게시글 CRUD (다중 이미지 업로드 및 미리보기), 게시글 카드 컴포넌트 디자인 작업 및 기능 구현, 메인페이지 무한스크롤 적용 + 검색 구현(throttle), 공통 검색 컴포넌트 구현, 루틴 CRUD + 검색 구현, 루틴 수정 모달, 루틴 캐러셀에 drag&drop 적용 및 구현, 운동 추가 모달, 댓글 CRUD 구현, 좋아요 기능 구현(debounce), 회원가입 구현, 로그인 구현, 내 정보 수정 구현 , 메인 + 음식 + 식단 + 루틴 + 로그인 + 회원가입 + 내정보 + 글쓰기/수정 디자인 작업 |