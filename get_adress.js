document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").addEventListener("click", async () => {
    try {
      const post = document.getElementById("postalCode").value;
      const response = await fetch(
        `https://jp-postal-code-api.ttskch.com/api/v1/${post}.json`
      );
      if (!response.ok) {
        throw new Error("エラーが発生しました");
      }
      const responseData = await response.json();
      // console.log(responseData);
      const addresData = responseData.addresses;
      if (addresData && addresData[0] && addresData[0].ja) {
        document.getElementById(
          "result"
        ).innerText = `住所：${addresData[0].ja.prefecture}${addresData[0].ja.address1}${addresData[0].ja.address2}`;
      } else {
        document.getElementById(
          "result"
        ).innerText = `住所を取得できませんでした`;
      }
    } catch (error) {
      console.error("エラーが発生しました");
    }
  });
});
