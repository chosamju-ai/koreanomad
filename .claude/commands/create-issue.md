# create-issue

GitHub 이슈를 자동으로 생성합니다.

## 사용법

```
/create-issue <이슈 내용 또는 설명>
```

## 설명

이 커맨드는 사용자가 제공한 내용을 분석하여 체계적인 GitHub 이슈를 생성합니다.

## 지시사항

당신은 GitHub 이슈 작성 전문가입니다.

사용자가 제공한 이슈 내용: "$ARGUMENT"

다음 단계를 수행하세요:

### 1. 이슈 분석
- $ARGUMENT를 분석하여 이슈의 유형을 파악합니다
  - Bug (버그): 기능이 예상대로 작동하지 않는 경우
  - Feature (기능): 새로운 기능 요청
  - Enhancement (개선): 기존 기능 개선
  - Documentation (문서): 문서 관련
  - Question (질문): 질문이나 논의 사항
  - Refactor (리팩토링): 코드 개선 작업
- 핵심 내용과 컨텍스트를 추출합니다

### 2. 이슈 제목 생성
다음 형식으로 명확하고 간결한 제목을 작성합니다:
- Bug: `[Bug] 문제 상황을 한 줄로 요약`
- Feature: `[Feature] 추가할 기능을 한 줄로 요약`
- Enhancement: `[Enhancement] 개선할 내용을 한 줄로 요약`
- Documentation: `[Docs] 문서 작업 내용`
- Question: `[Question] 질문 내용`
- Refactor: `[Refactor] 리팩토링 대상`

### 3. 이슈 본문 작성
이슈 유형에 따라 적절한 템플릿을 사용합니다:

#### Bug 템플릿:
```markdown
## 문제 설명
[버그에 대한 명확하고 간결한 설명]

## 재현 방법
1. [첫 번째 단계]
2. [두 번째 단계]
3. [세 번째 단계]
4. [오류 발생]

## 예상 동작
[어떻게 작동해야 하는지 설명]

## 실제 동작
[실제로 어떻게 작동하는지 설명]

## 환경
- OS: [예: Windows 11, macOS 14]
- 브라우저: [예: Chrome 120]
- Node.js: [예: v20.10.0]
- 기타: [관련 정보]

## 스크린샷/로그
[가능하면 스크린샷이나 에러 로그 추가]

## 추가 컨텍스트
[기타 관련 정보]
```

#### Feature 템플릿:
```markdown
## 기능 설명
[추가하려는 기능에 대한 명확한 설명]

## 동기 및 배경
[왜 이 기능이 필요한지, 어떤 문제를 해결하는지]

## 제안하는 해결 방법
[기능을 어떻게 구현할지에 대한 제안]

## 대안
[고려한 다른 대안이 있다면 설명]

## 추가 컨텍스트
[스크린샷, 예시 코드, 참고 링크 등]

## 체크리스트
- [ ] UI/UX 디자인
- [ ] 프론트엔드 구현
- [ ] 백엔드 API (필요시)
- [ ] 테스트 작성
- [ ] 문서 업데이트
```

#### Enhancement 템플릿:
```markdown
## 개선 내용
[무엇을 개선하려는지 설명]

## 현재 상황
[현재 어떻게 작동하는지]

## 개선 후 기대 효과
[개선하면 어떻게 나아지는지]

## 구현 방법
[어떻게 개선할지에 대한 제안]

## 추가 컨텍스트
[관련 정보]
```

#### Documentation 템플릿:
```markdown
## 문서 작업 내용
[어떤 문서를 작성하거나 수정할지]

## 목적
[왜 이 문서가 필요한지]

## 포함할 내용
- [ ] [항목 1]
- [ ] [항목 2]
- [ ] [항목 3]

## 참고 자료
[관련 링크나 자료]
```

#### Refactor 템플릿:
```markdown
## 리팩토링 대상
[어떤 코드를 리팩토링할지]

## 리팩토링 이유
[왜 리팩토링이 필요한지]

## 개선 방향
[어떻게 개선할지]

## 영향 범위
[어떤 파일/컴포넌트가 영향을 받는지]

## 체크리스트
- [ ] 기존 기능 유지
- [ ] 테스트 통과
- [ ] 코드 리뷰
```

### 4. 라벨 추천
이슈 유형에 따라 적절한 라벨을 추천합니다:
- Bug: `bug`, `priority:high` (심각도에 따라)
- Feature: `feature`, `enhancement`
- Enhancement: `enhancement`, `good first issue` (간단한 경우)
- Documentation: `documentation`
- Question: `question`
- Refactor: `refactor`, `technical-debt`

### 5. GitHub 이슈 생성
다음 순서로 진행합니다:

1. **먼저 사용자에게 이슈 미리보기 제공**
   - 생성될 이슈 제목과 본문을 보여줍니다
   - 추천 라벨을 표시합니다

2. **사용자 확인 후 실행**
   - 사용자가 확인하면 `gh issue create` 명령어 사용
   - 다음 형식으로 실행:
   ```bash
   gh issue create --title "제목" --body "$(cat <<'EOF'
   본문 내용
   EOF
   )"
   ```

3. **라벨 추가 (선택사항)**
   - 이슈 생성 후 라벨을 추가할지 물어봅니다
   - 확인되면 `gh issue edit <번호> --add-label "label1,label2"`

4. **결과 확인**
   - 생성된 이슈 URL 제공
   - 이슈 번호 표시

### 6. 주의사항
- $ARGUMENT가 너무 짧거나 불명확한 경우, 사용자에게 추가 정보를 요청합니다
- 이슈를 생성하기 전에 반드시 사용자에게 미리보기를 보여주고 확인을 받습니다
- GitHub CLI (`gh`)가 설치되어 있고 인증되어 있는지 먼저 확인합니다
- 현재 디렉토리가 Git 리포지토리인지 확인합니다

### 7. 출력 형식
```markdown
## 생성될 GitHub 이슈 미리보기

**제목:** [이슈 제목]

**유형:** [Bug/Feature/Enhancement/Documentation/Question/Refactor]

**추천 라벨:** `label1`, `label2`

**본문:**
[이슈 본문 내용]

---

이 내용으로 GitHub 이슈를 생성하시겠습니까?
```

## 예시

```bash
/create-issue 도시 상세 페이지에서 뒤로가기 버튼이 작동하지 않음
/create-issue 사용자가 즐겨찾기한 도시 목록을 볼 수 있는 기능 추가
/create-issue README에 프로젝트 설치 방법 추가
/create-issue city-grid 컴포넌트의 중복 코드 제거
```

## 참고
- GitHub CLI 문서: https://cli.github.com/manual/gh_issue_create
- 이슈 작성 가이드: https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue
