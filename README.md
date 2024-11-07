## Question 1
### Explains TypeScript compile workflow.
![TypeScript compile workflow](/CombineTypescriptFlow.png)
- Khi run/build chương trình, các file chứ code TypeScipt(.ts,.tsx) sẽ qua trình biên dịch TypeScript Complier (TSC) để chuyển đổi mã TypeScript thành JavaScript thông qua file config **tsconfig.json**.
- Nếu trong chương trình có sử dụng bable thì file JavaScript trước đó sẽ được xử lý, tối ưu hóa để tương thích với các phiên bản cũ của các trình duyệt.
- File JavaScript sau đó sẽ được gộp lại thành một hoặc nhiều file để tối ưu hóa hiệu suất, giảm số lượng file cần tải dựa vào webpack bundle. Các file đã được đóng gói này đã có thể chạy trên môi trường browrer hoặc nodejs.

### Server-side-rendering (SSR) project using Reactjs, Webpack to render theuser interface from scratch
#### Run project with local
> - clone project with clone https://github.com/manhcuongno3/UDT-REACTJS-TESTSHEET.git
> - checkout commit complete setup server-side rendering 
> - cd question1/ssr-typescript-reactjs
> - npm install
> - npm run build
> - npm start

### Unit test
> - checkout commit complete unit test
> - npm test


### Run project with docker
> - docker pull cpc0816/udt-reactjs-testsheet-app
> - docker run -p 3000:3000 cpc0816/udt-reactjs-testsheet-app
> - access http://localhost:3000 to see the calculator app
> - access http://localhost:3000/history to see the history of calculation

