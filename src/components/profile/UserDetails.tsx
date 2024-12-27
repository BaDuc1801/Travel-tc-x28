import { Button, Form, Input } from "antd";
import React, { useState, useContext } from "react";
import EditDetailsContext from "../../context/EditDetailsContext.ts";
import { Obj } from "../../interface/index.ts";
import axios from "axios";

const UserDetails: React.FC<{ userData: Obj }> = ({ userData }) => {
  // State to track which section is active
  const [activeSection, setActiveSection] = useState("Overview");
  const { editStatus } = useContext(EditDetailsContext);
  const [changePw, setChangePassword] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: Obj) => {
    try {
      console.log("Submitting:", values);
      const response = await axios.put(`http://localhost:8080/user/${userData._id}`,values);
      console.log("Server: ", response.data);
    } catch (error) {
      console.log("onFinish error: ", error);
    }
  };

  const renderArray = (array: Obj) => {
    if (!array || array.length == 0) return <span> None</span>;
    {
      return array.map((item: string, index: number) => (
        <span key={index} className="ml-1">
          {item}
        </span>
      ));
    }
  };

  // Sections data
  const sections = [
    { id: "Overview", label: "Overview" },
    { id: "Contact", label: "Contact" },
    { id: "Details", label: "More Details" },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      default:
        return editStatus ? (
          <Form form={form} onFinish={onFinish} className="text-xl">
            <Form.Item name="pronoun">
              <div>
                Pronouns:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.pronoun}`}
                />
              </div>
            </Form.Item>
            <Form.Item name="dob">
              <div>
                DOB:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.dob}`}
                />
              </div>
            </Form.Item>
            <Form.Item name="workplaces">
              <div>
                Workplaces:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.workplaces}`}
                />
              </div>
            </Form.Item>
            <Form.Item name="relationships">
              <div>
                Relationships:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.relationship}`}
                />
              </div>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        ) : (
          <div className="text-xl">
            <div>Pronouns: {userData?.pronoun} </div>
            <div>DOB: {userData?.dob} </div>
            <div>Workplaces: {renderArray(userData?.workplaces)} </div>
            <div>Relationships: {userData?.relationship} </div>
          </div>
        );
      case "Contact":
        return editStatus ? (
          <Form form={form} onFinish={onFinish} className="text-xl">
            <Form.Item name="phone">
              <div>
                Phone:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.phone}`}
                />
              </div>
            </Form.Item>
            <Form.Item name="email">
              <div>
                Email:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.email}`}
                />
              </div>
            </Form.Item>
            <Form.Item name="socials">
              <div>
                Other socials:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.socials}`}
                />
              </div>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        ) : (
          <div className="text-xl">
            <p>Phone: {userData?.phone}</p>
            <p>Email: {userData?.email} </p>
            <p>Other socials:{renderArray(userData?.socials)} </p>
          </div>
        );
      case "Details":
        return editStatus ? (
          <Form form={form} onFinish={onFinish} className="text-xl">
            <Form.Item name="cob">
              <div>
                Birth country:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.cob}`}
                />
              </div>
            </Form.Item>
            <Form.Item name="nationality">
              <div>
                Nationality:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.nationality}`}
                />
              </div>
            </Form.Item>
            <Form.Item name="education">
              <div>
                Other Education:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.education}`}
                />
              </div>
            </Form.Item>
            <Form.Item name="email">
              <div>
                Email:
                <Input
                  className="h-6 w-80"
                  size="small"
                  placeholder={`${userData?.email}`}
                />
              </div>
            </Form.Item>
            <br />
            {changePw ? (
              <div>
                <div>
                  Current Password:
                  <Input
                    className="h-6 w-80"
                    size="small"
                    placeholder={`Current Password`}
                  />
                </div>
                <div>
                  New Password:
                  <Input
                    className="h-6 w-80"
                    size="small"
                    placeholder={`New Password`}
                  />
                </div>
                <div>
                  Verify password:
                  <Input
                    className="h-6 w-80"
                    size="small"
                    placeholder={`Verify Password`}
                  />
                </div>
                <Button onClick={() => setChangePassword(!changePw)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setChangePassword(!changePw)}>
                Change password
              </Button>
            )}
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        ) : (
          <div className="text-xl">
            <p>Birth country: {userData?.cob}</p>
            <p>Nationality: {userData?.nationality} </p>
            <p>Education:{renderArray(userData?.education)} </p>
            <p>Email: {userData?.email} </p>
            <br />
            {changePw ? (
              <div>
                <div>
                  Current Password:
                  <Input
                    className="h-6 w-80"
                    size="small"
                    placeholder={`Current Password`}
                  />
                </div>
                <div>
                  New Password:
                  <Input
                    className="h-6 w-80"
                    size="small"
                    placeholder={`New Password`}
                  />
                </div>
                <div>
                  Verify password:
                  <Input
                    className="h-6 w-80"
                    size="small"
                    placeholder={`Verify Password`}
                  />
                </div>
                <Button onClick={() => setChangePassword(!changePw)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setChangePassword(!changePw)}>
                Change password{" "}
              </Button>
            )}
          </div>
        );
    }
  };
  return (
    <div className="userdetailssection mt-10 rounded-lg shadow">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-1/4 border-r p-4">
          <h2 className="mb-4 text-lg font-semibold">About</h2>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`mb-2 block w-full rounded px-4 py-2 text-left ${
                    activeSection === section.id
                      ? "bg-red-500 text-white"
                      : "text-gray-700"
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 p-4">
          <h2 className="mb-4 text-lg font-semibold">{activeSection}</h2>
          <div className="h-screen">{renderSectionContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
