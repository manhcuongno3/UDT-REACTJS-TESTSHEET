## Question 1
### Explains TypeScript compile workflow.
![TypeScript compile workflow](/CombineTypescriptFlow.png)
- Khi run/build chương trình, các file chứ code TypeScipt(.ts,.tsx) sẽ qua trình biên dịch TypeScript Complier (TSC) để chuyển đổi mã TypeScript thành JavaScript thông qua file config **tsconfig.json**.
- Nếu trong chương trình có sử dụng bable thì file JavaScript trước đó sẽ được xử lý, tối ưu hóa để tương thích với các phiên bản cũ của các trình duyệt.
- File JavaScript sau đó sẽ được gộp lại thành một hoặc nhiều file để tối ưu hóa hiệu suất, giảm số lượng file cần tải dựa vào webpack bundle. Các file đã được đóng gói này đã có thể chạy trên môi trường browrer hoặc nodejs.
### Server-side-rendering (SSR) project using Reactjs, Webpack to render theuser interface from scratch

>#### Run project
> - clone project
> - checkout commit complete setup server-side rendering 
> - cd question1/ssr-typescript-reactjs
> - npm install
> - npm run build
> - npm start

## Question 2
> - checkout branch feature/environment
> - npm install
> - npm run build
> - npm start


