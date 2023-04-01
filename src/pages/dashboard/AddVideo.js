import React from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import style from "./style/AddVideo.module.css";

const AddVideo = () => {
  return (
    <>
      <AdminNavbar />
      <div className={style.body}>
        <section class={style.container}>
          <header className={style.header}>Add Video Information</header>
          <form class={style.form}>
            <div class={style.inputBox}>
              <label>Video Title</label>
              <input type="text" placeholder="Enter video title" required />
            </div>

            <div class={style.inputBox}>
              <label>Video url</label>
              <input type="url" placeholder="Enter video url" required />
            </div>

            <div class={style.column}>
              <div class={style.inputBox}>
                <label>Number of views</label>
                <input
                  type="number"
                  min={0}
                  placeholder="Enter number of views"
                  required
                />
              </div>
              <div class={style.inputBox}>
                <label>Duration</label>
                <input type="text" placeholder="Enter duration" required />
              </div>
            </div>

            <div class={style.inputBox}>
              <label>Description</label>
              <textarea
                rows={5}
                placeholder="Enter video description"
                required
              ></textarea>
              {/* <input type="text" placeholder="Enter street address" required /> */}
            </div>
            <div className={style.btnDiv}>
              <button>Submit</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default AddVideo;
