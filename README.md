# winiaaid-TeamProject
> 팀 프로젝트로 위니아에이드라는 웹사이트를 클론 코딩하였습니다.  
> 자사 가전제품의 A/S를 신청받거나 제품에 관한 도움을 줄 수 있는 사이트입니다.  
> 해당 사이트에서 구현한 주요 기능은 다음과 같습니다.

+ 방문서비스
  + 신청 / 조회 / 변경 / 취소
  
+ 김치냉장고 리콜
  + 신청 / 조회 / 취소
  
+ 게시글
  + 작성 / 조회 / 수정 / 삭제
  
+ 회원 관리
  + 회원가입 / 로그인 / 정보 수정 / 회원탈퇴
  
+ 자주하는 질문 / 자가진단
  + 조회
  + 검색 / 카테고리, 증상별 검색
  
+ 서비스 이력
  + 서비스 신청 내역 보기
  + 게시글 작성 내역 보기

+ 회원 / 비회원 서비스 관리
  + 접수번호, 개인 인증번호를 통한 상세 페이지 조회 기능
  
+ 관리자 페이지
  + 제품 등록 / 제품 수정 / 제품 삭제
  
# **기술 스택**
<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
</p>
<p>
  <img src="https://img.shields.io/badge/Java-FF9E0F?style=flat-square&logo=Java&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat-square&logo=Spring Security&logoColor=white"/>
</p>
<p>
  <img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=MariaDB&logoColor=white"/>
  <img src="https://img.shields.io/badge/MyBatis-003545?style=flat-square&logo=MyBatis&logoColor=white"/>
</P>

# **개발 환경**
<p>
  <img src="https://img.shields.io/badge/IntelliJ IDEA-000000?style=flat-square&logo=IntelliJ IDEA&logoColor=white"/>
  <img src="https://img.shields.io/badge/Eclipse IDE-2C2255?style=flat-square&logo=Eclipse IDE&logoColor=white"/>
  <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>
</p>

# **주요 구현 기능**
### 방문서비스 신청

![서비스 신청1](https://user-images.githubusercontent.com/101931879/197474802-d2ae4bdf-7bfa-4ebc-be4b-45c4db1e5890.png)
![서비스 신청2](https://user-images.githubusercontent.com/101931879/197474939-903ab3ba-94ca-4f68-8529-dfdbbb008e01.png)

> 달력같은 경우는 캘린더 API를 사용하지 않고 JS로 구현해 보고 싶어서 JS로 따로 구현했습니다.
<br>

### 방문서비스 변경

![서비스 변경1](https://user-images.githubusercontent.com/101931879/197474841-1d55d80e-a250-488d-82cc-99313834b7a3.png)
> 서비스 변경시에는 예약시간 제외하고는 변경이 불가능 하게끔 구현했습니다.

![서비스 변경2](https://user-images.githubusercontent.com/101931879/197475046-22005d51-7b58-485a-a71b-1c6125677450.png)
> 예약했던 날짜는 이미 예약된 날짜라고 보기 어렵기 때문에 예약했던 날짜는 예약 불가능한 날짜에서 풀어줬습니다.

![변경 후 디테일](https://user-images.githubusercontent.com/101931879/197474857-bca29d55-4cdf-4ee4-8d15-c51b55371c61.png)
> 변경 전 후 디테일 뷰입니다.

### 자주하는 질문
![자주하는 질문](https://user-images.githubusercontent.com/101931879/197477228-60ac24a1-c4a2-4aae-923b-9ddd9f7a18ad.png)
<img src="https://user-images.githubusercontent.com/101931879/197489508-7b8fdaa5-a5f3-4435-b4ca-7c048fba52cb.png"  width="500px" height="370">


> 카테고리와 증상별로 검색 기능을 구현하였고 등록일순, 조회수별로 불러오는 기능을 구현했습니다.

### 비회원 게시글 작성
![비회원 게시글 작성](https://user-images.githubusercontent.com/101931879/197488537-e7f7fddf-9b70-46c5-851e-e0c687a4eb9a.png)
> 비회원은 게시글 작성시 휴대폰 인증이 필요로 하고 추가로 상세 페이지 인증을 위하여 개인 인증번호를 필요로 하게 됩니다.


### 비회원 게시글 조회
![비회원 게시글 조회](https://user-images.githubusercontent.com/101931879/197489117-f91f214c-fe55-4ca7-949c-de5030df6b94.png)
> 게시글 작성시 입력했던 정보를 바탕으로 내역을 확인할 수 있습니다.  
> 일치한 정보로 여러개의 게시글이 있다면 리스트로 조회 가능하게끔 구현을 했습니다.
