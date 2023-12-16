"use client";
import React, { useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Box,
  Title,
  Container,
  Grid,
  Image,
  Select,
} from "@mantine/core";
import { IconFileUpload } from "@tabler/icons-react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

const newRecipeSchema = Yup.object().shape({
  recipeName: Yup.string().required("Recipe name is required"),
  recipeDescription: Yup.string().required("Recipe description is required"),
  recipeTime: Yup.number()
    .integer()
    .required("Recipe Time is required")
    .max(100000000, "To big")
    .min(0, "Not negative number"),
  recipeIngredients: Yup.array()
    .of(Yup.string().required("Ingredient is required"))
    .min(1, "At least one ingredient is required"),
  recipeImages: Yup.array().of(Yup.string().required("Image is required")), // Base64 strings
  recipeSteps: Yup.array()
    .of(Yup.string().required("Step description is required"))
    .min(1, "At least one step is required"),
  recipeCuisine: Yup.string()
    .required("Cuisine is required")
    .oneOf(
      ["Arabian", "Asian", "Italian", "Indian", "Chinese"],
      "Invalid cuisine"
    ),
});

const NewRecipePage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const handleImageUpload = (e: any, setFieldValue: any) => {
    const files = e.target.files;
    const readFiles = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result);
        reader.readAsDataURL(file as Blob);
      });
    });

    Promise.all(readFiles).then((images) => {
      setFieldValue("recipeImages", images);
    });
  };

  const handleNext = (validateForm: any) => {
    validateForm().then((errors: any) => {
      if (Object.keys(errors).length === 1) {
        setCurrentStep(currentStep + 1);
      }
    });
  };

  return (
    <Container size="lg" my={30}>
      <Title order={1} mb="xl" className="w-6/12">
        Share Your Recipe with the CookMate Community
      </Title>

      <Formik
        initialValues={{
          recipeName: "",
          recipeDescription: "",
          recipeIngredients: [""],
          recipeImages: [],
          recipeSteps: [""],
          recipeTime: "",
          recipeCuisine: "",
        }}
        validationSchema={newRecipeSchema}
        onSubmit={async (values) => {
          const session = await getSession();
          const userId = session?.user.id; // Adjust according to your session data structure

          // Form submission logic
          try {
            const response = await fetch("/api/recipes", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...values, userId }),
            });

            if (!response.ok) {
              throw new Error("Recipe creation failed");
            }

            router.push("/home");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          validateForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid mt="xl">
              {currentStep === 1 && (
                <>
                  <Grid.Col span={6}>
                    <h1 className="text-primary semi-bold text-xl">
                      First Recipe Details
                    </h1>
                    <TextInput
                      size="md"
                      mt="xl"
                      label="Recipe Name"
                      name="recipeName"
                      value={values.recipeName}
                      onChange={handleChange}
                      error={errors.recipeName}
                    />
                    <Textarea
                      autosize
                      minRows={3}
                      mt="xl"
                      label="Recipe Description"
                      name="recipeDescription"
                      value={values.recipeDescription}
                      onChange={handleChange}
                      error={errors.recipeDescription}
                    />
                    <FieldArray
                      name="recipeIngredients"
                      render={({ push, remove }) => (
                        <Box mt="xl">
                          <h1 className="text-xl font-semibold">
                            Recipe Ingredients
                          </h1>
                          {values.recipeIngredients.map((ingredient, index) => (
                            <Group key={index} mt="xs">
                              <TextInput
                                size="md"
                                name={`recipeIngredients[${index}]`}
                                value={ingredient}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  errors.recipeIngredients &&
                                  errors.recipeIngredients[index]
                                }
                              />
                              {values.recipeIngredients.length > 1 && (
                                <Button
                                  color="red"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </Button>
                              )}
                            </Group>
                          ))}
                          <Button
                            color="grey"
                            radius="lg"
                            mt="md"
                            onClick={() => push("")}
                          >
                            Add new ingredient
                          </Button>
                        </Box>
                      )}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <h1 className="text-primary semi-bold text-xl">
                      Recipe Images
                    </h1>
                    <Box mt="xl" className="flex">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(e, setFieldValue)}
                        style={{ display: "none" }}
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        style={{
                          cursor: "pointer",
                          opacity: 0.35,
                          padding: "64px",
                        }}
                        className="bg-primary w-11/12 rounded-lg outline-dashed"
                      >
                        <Group align="center" className="ml-40">
                          <IconFileUpload size={32} />
                        </Group>
                      </label>
                    </Box>
                    <TextInput
                      size="md"
                      label="Preparation Time (in minutes)"
                      name="recipeTime"
                      type="number" // ensures only numbers are entered
                      value={values.recipeTime}
                      onChange={handleChange}
                      error={errors.recipeTime}
                      className="mt-8"
                    />
                    <Select
                      name="recipeCuisine"
                      mt="xl"
                      size="md"
                      label="Recipe Cuisine"
                      placeholder="Cuisine"
                      data={[
                        "Arabian",
                        "Asian",
                        "Italian",
                        "Indian",
                        "Chinese",
                      ]}
                      value={values.recipeCuisine}
                      onChange={(value) =>
                        setFieldValue("recipeCuisine", value)
                      }
                      error={errors.recipeCuisine}
                    />
                  </Grid.Col>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <Grid.Col span={6}>
                    <Box>
                      <FieldArray
                        name="recipeSteps"
                        render={({ push, remove }) => (
                          <Box>
                            {values.recipeSteps.map((step, index) => (
                              <Group key={index} mt="xs">
                                <Textarea
                                  className="w-10/12"
                                  autosize
                                  minRows={3}
                                  label={`Step ${index + 1}`}
                                  name={`recipeSteps[${index}]`}
                                  value={step}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    errors.recipeSteps &&
                                    errors.recipeSteps[index]
                                  }
                                />
                                {values.recipeSteps.length > 1 && (
                                  <Button
                                    color="red"
                                    onClick={() => remove(index)}
                                    radius="lg"
                                  >
                                    Remove
                                  </Button>
                                )}
                              </Group>
                            ))}
                            <Button
                              radius="lg"
                              color="grey"
                              mt="md"
                              onClick={() => push("")}
                            >
                              Add new step
                            </Button>
                          </Box>
                        )}
                      />
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Image
                      src="/pot.jpg"
                      alt="Chars"
                      width={921}
                      height={619}
                      className=""
                    />
                  </Grid.Col>
                </>
              )}

              {currentStep < 2 && (
                <div className="w-6/12">
                  <Button
                    style={{ backgroundColor: "rgba(91, 124, 117, 1)" }}
                    mt="lg"
                    onClick={() => handleNext(validateForm)}
                    radius="lg"
                    fullWidth
                  >
                    Next
                  </Button>
                </div>
              )}
              <Grid.Col span={6}>
                {currentStep === 2 && (
                  <div>
                    <Button
                      style={{ backgroundColor: "rgba(91, 124, 117, 1)" }}
                      type="submit"
                      mt="lg"
                      fullWidth
                      radius="lg"
                    >
                      Save Recipe
                    </Button>
                  </div>
                )}
              </Grid.Col>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewRecipePage;
