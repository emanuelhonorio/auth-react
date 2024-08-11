export default function UnauthorizedPage() {
    return <div id="error-page">
    <h1>Unauthorized</h1>
    <p>Sorry, you dont have permisson to access this page.</p>
    <p>
      {/*<i>{error.statusText || error.message}</i>*/}
    </p>
  </div>;
}