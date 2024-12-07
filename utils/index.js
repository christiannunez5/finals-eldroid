import axios from "axios";

export const uploadToCloudinary = async (imageURI) => {
    const formData = new FormData();

    formData.append("file", {
        uri: imageURI,
        name: "photo.jpg",
        type: "image/jpeg",
    });

    formData.append("upload_preset", "my_preset");
    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dot5tgn58/image/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data.secure_url;
    } catch (error) {
        console.log("error: ", error.message);
    }
};
