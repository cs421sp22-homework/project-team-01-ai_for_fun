# Getpost

Returns all posts related to a user

**URL** : `/getfollowerpost/:user_id`

**Method** : `get`

**Auth required** : No
**Data constraints**

empty

**Data example**

empty


## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": "624f96f69a06b72ed53dd738",
        "comment": [],
        "content_url": "https://hips.hearstapps.com/cosmouk.cdnds.net/15/33/1439714614-celebrity-face-mashups-taylor-swift-emma-watson.jpg",
        "liked_time": [],
        "post_id": "624f96f69a06b72ed53dd738",
        "post_text": "test",
        "post_time": "2022-04-07T21:59:18.448-04:00",
        "user_avater": "",
        "user_id": "62340222554768fb6cd0f781",
        "user_name": "test"
    },
    {
        "_id": "624f9a309a06b72ed53dd73a",
        "comment": [],
        "content_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxopB3Y_Z0Yu1v5JpXdx-3NOKX7yqg1iIHg&usqp=CAU",
        "liked_time": [],
        "post_id": "624f9a309a06b72ed53dd73a",
        "post_text": "test test",
        "post_time": "2022-04-07T22:13:04.855-04:00",
        "user_avater": "",
        "user_id": "62340222554768fb6cd0f781",
        "user_name": "test"
    },
    {
        "_id": "625480138a10c9dc211124bb",
        "comment": [],
        "content_url": "https://aifun.s3.amazonaws.com/1ELx2HcwaLcq61YK.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXRGYYT5KAP6UULMP%2F20220411%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220411T192240Z&X-Amz-Expires=7200&X-Amz-SignedHeaders=host&X-Amz-Signature=d3a2d4629d97acf1143a7f476634e386b7a3e4225b512a25d7be23ea4738e0f0",
        "liked_time": [],
        "post_id": "625480138a10c9dc211124bb",
        "post_text": "Amazing work for test to audio",
        "post_time": "2022-04-11T15:22:59.269-04:00",
        "user_avater": "https://aifun.s3.us-east-1.amazonaws.com/public/uZlLXklbPrXNYYve.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXRGYYT5KFZQQCZFV%2F20220409%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220409T195045Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLWVhc3QtMSJGMEQCIFGOhPbFj1A%2FfzxIVrRrssLxwpelYRkMSw5RlEipeEFwAiBbRAP7w6VZZMxSmXW2FPma%2BD2iw36fe%2F%2Fp8tIbmp%2BGQCqaBgj1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDUxNzk5ODE1NzY1MiIMiFtH560Txl8yCRvbKu4FGlmu9aKFJx7%2F3dndSBe%2B%2FpYOlSToVjyubdOVi2ACfU2BHD82HOmT129T6XlHirBl%2FF0qVlXYNNB8mcsNh%2BrPlTYnsAlgwx8s13XABAWbPZib%2BuflOYnj9D8ciHpqXlfT37%2B0jmcm3T5KyxfJUS59Ux7TeDcQTfvDuIvErA3y4MYWL0czu5wUCvxDwp7hZKgMrmLr9b7M6BQt48WGs7Ew4uKyb5hIt%2FV%2Bk96MuaMJFX56cDA%2F4%2F2pOd5qRVzc3cGNa0NY%2FRjSvNN7qsWuaVPe%2BEmEuQYA9FCu65YwTluFFbOh3AL2zZBW80AicdyF5QRjFXJDaxgTIy6iWndm2ViemDZIV3n1OX46E8jVNRqkfpoT2tM%2BFl4fhe9JfXLIdcYTpsvf6G6URMFBPbBbRSkXTxevgv6FeA%2FYsgTyEeTfHyXPwW3Fvfbx7yeO16OufHT6CbpOQkeS7fqEmOMNXKJVyibveDRNr%2BVPoZmiVjR8DJimL4HtaCVEoPv71NqUF7dQS0uq%2BGDatkncKHt7hA%2FBg93VhNc%2BHULmZs5CQvuvwaTe%2BOEtarMlx73vgWQL73L6Th3DD1ClfKTBgaIHZcS%2BeNNIDC96Hn0D3gpeLdcdG3URnT3kozWv6TxBXA9mDg2V2VGyQ%2Fx1Ds%2B09pH7DRjOghlqy3VTSTqRDZsAa79FxHagRMGCl8xtDjUp%2Fn1VUV0EkS6Ozjs%2Fj%2Ba38G3otcdpO61lLRfUdQ9nwA4PWM1JLE0BsR0YFFzch61P2nKuaDQdPUPh1uOXbl8PYyS6pVnWz4HdKkRvl223DPRtJ5UK1%2BtS8rWKET5KM3XdnfpFlhT7wesaXEOgnHIeULdFJhWWAwOVtwE3ckzbFFSPLzQi4u%2FmxEejo0HTKuPJ4NEDTWR%2FbdJurTJ1uiRre0U6Uter7JFvp2dizZyjekvYNEJmXJjjbBurNXNLXeko3qNADFKF%2Fwo2IFy%2FbeCniVPesrKY0xOuZ5sEIoDI18w76EhXMJTHx5IGOogCfawBR5Gp7jaVjZ%2B8%2BYHPKR%2F1MIrE2U66cODboFaPRNKGU0KMOiDQFNReUt8y19RnfsgAcG2wyf%2FiqyUilN5OnUFXfZxXGGpjMvlSaUKaC46rcU%2BX7VO36urJjj0fB9RQfHwb%2BFfgc0kRpZqyuVK2%2BBmK8hMY8j1mb1r9b%2F%2BgJVA8c3eEQrjHTirCYFWXbAbpqX4o1sfwgaR%2BSiqqrFTeX%2BFM0Jt9haPKWuRa84mshzzcyVd6wh0pqw1D9s98QOdQpXbUZzXIJp9cq9s4GeQdz9LEgDjk8v%2B%2F4U27xafjT0HDxmkFqvn75JFBua8XJLSyrIQ%2F9Zpy4sOhhMokg5g8nq7VoBIl0%2BBB&X-Amz-Signature=e35385aabdb84c9c1d8ce769270bc7becfd67080a49caf82898d3ca62fe98545&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2FmacOS%2F10.15.7%20lang%2Fjs%20md%2Fbrowser%2FChrome_99.0.4844.83%20api%2Fs3%2F3.6.1%20aws-amplify%2F4.4.0_js&x-id=GetObject",
        "user_id": "62340222554768fb6cd0f781",
        "user_name": "test"
    }
]
```
**Code** : `500 Internal Server Error`
