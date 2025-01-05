document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").addEventListener("click", async () => {
    try {
      const post = document.getElementById("postalCode").value;
      const response = await fetch(`/api/address?postalCode=${post}`);

      if (!response.ok) {
        throw new Error("エラーが発生しました");
      }

      const responseData = await response.json();

      if (responseData.error) {
        document.getElementById("result").innerText = responseData.error;
      } else {
        document.getElementById(
          "result"
        ).innerText = `住所：${responseData.prefecture}${responseData.address1}${responseData.address2}`;
      }
    } catch (error) {
      console.error("エラー:", error);
      document.getElementById("result").innerText =
        "住所を取得できませんでした";
    }
  });
});
