import React, { useContext, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

function UpdateProfile() {
  const { user, update } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
  const [userImage, setUserImage] = useState(null);

  const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
    update(_, { data: { updateProfile: userData } }) {
      update(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted: () => {
      setErrors({});
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    },
    variables: {
      id: user.id,
      username,
      newEmail,
      oldEmail: user.email,
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    updateProfile();
  };
  return (
    <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
      <h1>Update Profile</h1>
      {userImage ? (
        <div className="contact-image-uploaded-wrapper">
          <img
            className="contact-image-uploaded"
            src={userImage}
            alt="Profile"
          />
        </div>
      ) : (
        <div className="contact-circle">
          <div className="contact-image-wrapper">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="user"
              className="svg-inline--fa fa-user fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                className="contact-image"
              ></path>
            </svg>
          </div>
        </div>
      )}

      <input
        id="raised-button-file"
        name="document"
        type="file"
        className="upload-file"
        onChange={async ({ target: { files } }) => {
          const file = files[0];
          if (file) {
            // 1.6e7 bytes = 16 mb
            if (file.size < 1.6e7) {
              setUserImage(URL.createObjectURL(file));
              try {
              } catch (err) {
                console.log(err);
              }

              // try {
              //   const upload = await logoUpload({ variables: { file } });
              //   setUserImage(file.filename);
              //   setLogoImage(imageBase(upload.data.logoUpload.filename));
              //   setLoading(false);
              // } catch (err) {
              //   setErrorUpload(graphQLErrorTrim(err.message));
              //   setLoading(false);
              // }
            } else {
              setErrors({
                imageError:
                  "File upload too large. Upload must be less than 16 mb.",
                ...errors,
              });
            }
          } else {
            setUserImage(null);
          }
        }}
      />

      <Form.Input
        icon="user"
        iconPosition="left"
        label="Username"
        placeholder="Username"
        name="username"
        type="text"
        value={username}
        error={errors && errors.username ? true : false}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Form.Input
        icon="at"
        iconPosition="left"
        label="Email"
        placeholder="Email"
        name="email"
        type="email"
        value={newEmail}
        error={errors && errors.newEmail ? true : false}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <Button primary type="submit">
        Save
      </Button>

      {success && (
        <Message id="message" positive>
          User successfully updated.
        </Message>
      )}

      {Object.keys(errors).length > 0 && (
        <Message id="message" negative>
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </Message>
      )}
    </Form>
  );
}

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $username: String!
    $oldEmail: String!
    $newEmail: String!
  ) {
    updateProfile(
      updateProfileInput: {
        id: $id
        username: $username
        oldEmail: $oldEmail
        newEmail: $newEmail
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default UpdateProfile;
