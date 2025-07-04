import { Form, Input, Button } from "@heroui/react";
import { Textarea } from "@nextui-org/react";
import ImageUpload from "../../components/ImageUpload";
import CustomLocationPicker from "../../components/CustomLocationPicker";
import React, { useState } from "react";

const RegisterSalon = () => {
    interface FormData {
        email: string;
        ownerName: string;
        location: string;
        salonName: string;
        phone: string;
        description: string;
        salonImages: string[];
    }
    const [location, setLocation] = useState<[number, number] | null>(null);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        ownerName: "",
        location: "",
        salonName: "",
        phone: "",
        description: "",
        salonImages: [],
    });
    const handleSubmit = async () => {
        console.log("Form submitted");
        console.log("Location:", location);
        console.log(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (base64Images: string[]) => {
        setFormData((prev) => ({
            ...prev,
            salonImages: base64Images,
        }));
    };

    const handleLocationChange = (newLocation: [number, number] | null) => {
        // If storing as string in form data
        if (newLocation) {
            setFormData((prev) => ({
                ...prev,
                location: `${newLocation[0]},${newLocation[1]}`,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                location: "",
            }));
        }

        // Also store the raw location if needed
        setLocation(newLocation);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 font-instrumentSerif">
            <h1 className="text-4xl font-semibold mb-8 text-center">REGISTER FORM</h1>

            {/* Form container */}
            <Form
                onSubmit={handleSubmit}
                className="w-2/3 bg-white p-10 rounded-xl shadow-md items-center"
            >
                {/* Flex row to split into two columns */}
                <div className="flex flex-row gap-6 w-full">
                    {/* Column 1 */}
                    <div className="w-1/2 flex flex-col gap-6">
                        <Input
                            isRequired
                            label="Business Email"
                            labelPlacement="outside"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            label="Owner Name"
                            labelPlacement="outside"
                            name="ownerName"
                            placeholder="Enter the owner's name"
                            type="text"
                            value={formData.ownerName}
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            label="Location"
                            labelPlacement="outside"
                            name="location"
                            placeholder="Enter your location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                        />
                        {/*insert the location from a map */}
                        <CustomLocationPicker
                            initialLocation={null}
                            onChange={handleLocationChange}
                        />
                    </div>

                    {/* Column 2 */}
                    <div className="w-1/2 flex flex-col gap-6">
                        <Input
                            isRequired
                            label="Business Name"
                            labelPlacement="outside"
                            name="salonName"
                            placeholder="Enter your business name"
                            type="text"
                            value={formData.salonName}
                            onChange={handleChange}
                        />
                        <Input
                            isRequired
                            label="Business Phone No."
                            labelPlacement="outside"
                            name="phone"
                            placeholder="Enter your business phone number"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <Textarea
                            isRequired
                            label="Business Description"
                            labelPlacement="outside"
                            name="description"
                            placeholder="Enter a brief description of your business"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                        />
                        <ImageUpload
                            label="Add photos of your Business"
                            name="salonImages"
                            multiple={true}
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                    <Button type="reset" variant="flat">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default RegisterSalon;
