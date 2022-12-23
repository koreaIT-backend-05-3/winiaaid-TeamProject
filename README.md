# winiaaid-TeamProject
> 팀 프로젝트로 위니아에이드라는 웹사이트를 클론 코딩하였습니다.  
> 자사 가전제품의 A/S를 신청받거나 제품에 관한 도움을 줄 수 있는 사이트입니다.  
> 해당 사이트에서 구현한 주요 기능은 다음과 같습니다.

+ 방문서비스
  + 신청 / 조회 / 변경 / 취소
  + 이전 신청 내역으로 간단하게 정보 입력하기
  + 이전 신청 주소 
  
+ 김치냉장고 리콜
  + 신청 / 조회 / 취소
  
+ 게시글
  + 작성 / 조회 / 수정 / 삭제
  
+ 회원 관리
  + 회원가입 / 로그인 / 정보 수정 / 회원탈퇴
  + 아이디 찾기
  + 비밀번호 재설정
  
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
  + 자주하는 질문, 자가진단 등록 / 수정 / 삭제
  + 게시판 이동, 삭제, 답변
  + A/S 신청 서비스 관리
  + 회원 관리
<br>

# 프로젝트 배포 및 기존 사이트
> [기존 사이트](https://www.winiaaid.com/main)  
> [배포 주소](http://52.79.88.100:8000/main)  
> 배포는 AWS를 이용해서 배포를 했습니다.
  
# **기술 스택**
<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/>
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
<p>
  <img src="https://img.shields.io/badge/Apache Maven-C71A36?style=flat-square&logo=Apache Maven&logoColor=white"/>
</p>
<br>

<br>

# **주요 구현 기능**
### 방문서비스 신청

![서비스 신청1](https://user-images.githubusercontent.com/101931879/197474802-d2ae4bdf-7bfa-4ebc-be4b-45c4db1e5890.png)
![서비스 신청2](https://user-images.githubusercontent.com/101931879/197474939-903ab3ba-94ca-4f68-8529-dfdbbb008e01.png)

> 달력 같은 경우는 캘린더 API를 사용하지 않고 JS로 구현해 보고 싶어서 JS로 따로 구현했습니다.
<br>

### 방문서비스 변경

![서비스 변경1](https://user-images.githubusercontent.com/101931879/197474841-1d55d80e-a250-488d-82cc-99313834b7a3.png)
> 서비스 변경 시에는 예약시간 제외하고는 변경이 불가능하게끔 구현했습니다.

![서비스 변경2](https://user-images.githubusercontent.com/101931879/197475046-22005d51-7b58-485a-a71b-1c6125677450.png)
> 예약했던 날짜는 이미 예약된 날짜라고 보기 어렵기 때문에 예약했던 날짜는 예약 불가능한 날짜에서 풀어줬습니다.

![변경 후 디테일](https://user-images.githubusercontent.com/101931879/197474857-bca29d55-4cdf-4ee4-8d15-c51b55371c61.png)
> 변경 전후 디테일 뷰입니다.
<br>

### 자주하는 질문 / 자가진단
![자주하는 질문](https://user-images.githubusercontent.com/101931879/197528588-7007ad58-b25e-404e-8d7f-7e23ec95452c.png)
<img src="https://user-images.githubusercontent.com/101931879/197489508-7b8fdaa5-a5f3-4435-b4ca-7c048fba52cb.png"  width="500px" height="370">
> 카테고리와 증상별로 검색 기능을 구현하였고 등록일순, 조회 수별로 불러오는 기능을 구현했습니다.
<br>

### 비회원 게시글 작성
![게시글 작성](https://user-images.githubusercontent.com/101931879/197527727-2ff88dc9-6815-475a-ae93-aa86c4946159.png)
> 비회원은 게시글 작성 시 휴대폰 인증이 필요로 하고 추가로 상세 페이지 인증을 위하여 개인 인증번호를 필요로 하게 됩니다.
<br>

### 비회원 게시글 조회
![비회원 게시글 조회](https://user-images.githubusercontent.com/101931879/197489117-f91f214c-fe55-4ca7-949c-de5030df6b94.png)
> 게시글 작성 시 입력했던 정보를 바탕으로 내역을 확인할 수 있습니다.  
> 일치한 정보로 여러 개의 게시글이 있다면 리스트로 조회 가능하게끔 구현을 했습니다.
<br>

### 서비스 이용 현황
![서비스 이용 현황](https://user-images.githubusercontent.com/101931879/197528136-0aaa538b-4a6a-479d-bcef-1ee59d369db7.png)
> 서비스 내역을 리스트로 간편하게 볼 수 있고 진행 중과 완료를 나누었습니다.  
> 또한 게시글 작성 내역도 확인할 수 있습니다.  
> 두 기능 모두 검색 기능을 구현했습니다.  
> 접수번호를 클릭 시 상세 페이지로 넘어갑니다.
<br>

### 아이디 찾기, 비밀번호 재설정
![아이디 찾기](https://user-images.githubusercontent.com/101931879/197527045-edcc186d-08e4-4c5a-8584-62b0dfee7538.png)
![비밀번호 재설정](https://user-images.githubusercontent.com/101931879/197527057-53159f0d-9ebf-4fba-a04a-df22d61ccae7.png)
> 휴대폰 인증을 통해 아이디를 찾을 수 있습니다.  
> 마찬가지로 휴대폰 인증을 통해 가입되어 있는 이메일을 찾고 원하는 이메일로 임시 비밀번호를 전송해 줍니다.
<br>

### 관리자 - 제품 등록
![관리자 제품 등록](https://user-images.githubusercontent.com/101931879/197514883-ca86f85c-453a-40ce-9248-317484e34765.png)
> 관리자 기능 중 가장 중요하다고 생각하는 제품 등록/조회/수정/삭제 기능을 먼저 구현했습니다.
<br>

### 관리자 - 제품 수정 및 삭제
![관리자 제품 수정](https://user-images.githubusercontent.com/101931879/197515587-cf73504b-42a7-4dcc-8516-efcfd1a2b169.png)
> 제품의 카테고리를 이동시킬 수 있고 제품을 삭제 기능과 고장 증상 추가 및 삭제 기능까지 구현했습니다.  
> 해당 카테고리에 이미 등록되어 있는 고장 증상은 DB에서 제외한 데이터를 응답해 주었습니다.
<br>

# **부가 구현 기능**
### CoolSMS를 이용한 휴대폰 인증
### Starter-Mail을 이용한 이메일 전송
### AOP - 회원가입시 Validation 체크같은 로직은 부가적인 기능이기에 따로 나누어 주었습니다.
### Remember Me를 이용한 로그인 유지
### 썸머노트를 이용한 게시글 작성(이미지 삽입 및 업로드 구현)
### 도로명주소 API를 통한 주소창 구현
![주소 모달창](https://user-images.githubusercontent.com/101931879/197574367-528cf99f-20ee-49df-818f-ba9c91013eeb.png)
<br>  

# 데이터베이스 
> 프로젝트 시작하고 DB 설계를 진행할 때 제품 카테고리 안에 카테고리가 있고 그 안에 다시 상세 제품이 있는 경우가 있어서 이것을 구현함에 있어서  
> 추후에 관리자 페이지를 통해서도 데이터가 들어가야 하고 유동적으로 데이터를 응답하게 만들려고 했습니다.  
> 시간은 많이 걸렸지만 의도한 대로 작동이 되는 것을 보고 뿌듯함을 느꼈습니다.  

[Table Diagram](https://www.erdcloud.com/d/J2q7n4wyrEbtkaFRo)  
<br>

![ERD](https://user-images.githubusercontent.com/101931879/197667103-15686913-ece9-46f1-bf08-b614b742c3ff.png)
<br>  

# 아쉬운 점

> 5주간의 프로젝트 기간 동안 충분히 관리자 페이지도 만들고 더 많은 기능을 구현할 수 있을 거라고 생각을 했지만  
> DB 설계와 REST API 설계 규칙 위반에 따른 API 주소 수정 그리고 JavaScript를 통한 동적인 부분을 처리하는 과정에서  
> 구현을 마쳤지만 시간이 많이 소요되었습니다.  
> AOP를 통해 API URL 체크도 초반에 구현을 하고 테스트도 완료했었지만 다른 부분에 신경을 쓰다 보니 몇 개의 API 요청에만 적용이 되었습니다.  
> 하지만 이것 또한 다음에 더욱 좋은 결과를 만들어 내기 위한 소중한 경험이라고 생각을 하고 더욱 발전해 나가겠습니다.  
<br>  

# 프로젝트 전체 소감
  
> 5주간 프로젝트를 진행하면서 느낀 점이 많습니다.  
> 이전에 혼자서 농장 홈페이지와 간단한 주차권 관리 프로그램을 구현하면서 나름 연습을 많이 해보았지만    
> REST API 설계 규칙을 위반하고 DB 테이블의 컬럼이 너무 한 곳으로 몰린 탓에 DB 테이블 수정과  
> API 주소 수정, 코드 중복 보완으로 인해 프로젝트 기간 중 상당 시간을 소비한 것이 아쉽지만  
> 다시 한번 부족함을 느끼고 설계의 중요성을 느낀 계기가 되었습니다.  
> 그로 인해서 조금 더 성장을 했다고 생각을 하고 다음 프로젝트에는 좀 더 나은 결과물이 나오게끔 노력하겠습니다.  
> 관리자 페이지를 통해서 데이터를 유동적으로 바꿀 수 있게 하고 싶은 마음에 처음 DB 테이블을 만들 때부터 고민을 많이 해보고  
> 시행착오도 많이 겪고 수정도 많이 한 만큼 시간이 오래 걸렸지만 이로 인해서 쿼리문에 대한 경험을 쌓았고, 다양한 방법의 쿼리문을 사용함에 있어서 좋았습니다.  
> 아쉬운 점도 있고 개선사항도 있지만 첫 프로젝트이지만 완성도 높게 구현했다고 생각이 되고 Spring Framework와 Filter, AOP, DI, DB에 대해 많은 것을 배운 시간이 된 것 같습니다.  
> 이러한 경험을 살려 다음에는 더욱 좋은 결과물을 만들겠습니다.
