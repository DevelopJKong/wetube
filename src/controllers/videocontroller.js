import Video from "../models/Video";

/* Video.find({},(error,videos) => {
  if(error){
      return res.render("server-error");
  }
  return res.render("home",{pageTitle:"Home",videos})

});*/

//await 가 대단한 이유는 database를 기다려주기 때문이다
//async 라고 적어준이유는 안에 있는 await를 function 안에서 동작한다는것을 알려주기 위함이다
export const home = async (req, res) => {
  const videos = await Video.find({});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async(req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
 if(!video){
   return res.render("404",{pageTitle:"Video not found."})
  }
return res.render("watch", { pageTitle: video.title ,video});
};
export const getEdit = async(req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if(!video){
    return res.render("404",{pageTitle:"Video not found."})
   }
  return res.render("edit", { pageTitle: `Editing${video.title}`,video });
};


export const postEdit = async(req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  console.log(title, description, hashtags);
  try {
    await Video.create({
      title,
      description,
      hashtags: "food,movies,music".split(",").map((word) => `#${word}`),
      
    });
    //video.save(); //save는 promise라 다 끝날때 까지 기다려줘야 한다
    //console.log(dbVideo);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
