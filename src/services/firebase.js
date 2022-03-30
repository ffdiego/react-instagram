import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return !result.empty;
}

export async function getUser(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  const [user] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}

export async function getProfile(profile) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", profile)
    .get();

  if (!result.empty) {
    let [response] = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));

    response = {
      ...response,
      followerCount: (await getFollowers(profile)).length,
      followingCount: response.following.length,
      photos: await getUserPhotosByUsername(profile),
    };
    return response;
  }
  return false;
}

export async function getSuggestedProfiles(username, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  const res = result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (item) => item.username !== username && !following.includes(item.username)
    );
  return res;
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

// updateLoggedInUserFollowing
// updateFollowedUserFollowers

export async function addFollower(username, profile, remove) {
  const query = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  query.docs.map((item) =>
    item.ref.update({
      following: remove
        ? FieldValue.arrayRemove(profile)
        : FieldValue.arrayUnion(profile),
    })
  );
}

export async function getPhotos(username, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("author", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserLikes = await Promise.all(
    userFollowedPhotos.map((photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(username)) userLikedPhoto = true;
      return { ...photo, userLikedPhoto };
    })
  );

  return photosWithUserLikes;
}

export async function getUserPhotosByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("author", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function isUserFollowingProfile(username, profile) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .where("following", "array-contains", profile)
    .get();
  return !result.empty;
}

export async function getFollowers(username) {
  let followers = [];
  const result = await firebase
    .firestore()
    .collection("users")
    .where("following", "array-contains", username)
    .get();

  result.docs.map((item) => (followers = [...followers, item.data().username]));
  return followers;
}

export async function addCommentFB(username, comment, docId) {
  return firebase
    .firestore()
    .collection("photos")
    .doc(docId)
    .update({
      comments: FieldValue.arrayUnion({ username, comment }),
    });
}
