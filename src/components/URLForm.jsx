import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Input, Label, Row, Col, Container, Button } from 'reactstrap';
import { addServer } from '../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import loading from '../images/loading.gif'

const URLForm = (props) => {
    const dispatch = useDispatch();
    function addServerHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let { template, version, url } = e.currentTarget.elements;
        version = version.value;

        // validation goes here..
        if (url.value.trim() === "") {
            return false;
        }
        else if (template.value.trim() === "select") {
            return false;
        }
        else if (version.trim() === "select") {
            return false;
        }
        let { name } = JSON.parse(template.value);
        const formData = {
            url: url.value,
            templateName: name,
            version: version
        }
        dispatch(addServer(JSON.stringify(formData)))
    }
    const { templateData, isTemplateLoading } = useSelector(state => state.server);
console.log(isTemplateLoading)
    const [versionList, setVersionList] = useState('');
    return (
        <Container className="template-form">
            <Form onSubmit={(e) => addServerHandler(e)}>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label className="mr-sm-2" for="form-template-name">Template Name*</Label>
                            <Input
                                type="select"
                                name="template"
                                id="form-template-name"
                                defaultValue="select"
                                onChange={(e) => {
                                    let selectValue = JSON.parse(e.currentTarget.value);
                                    setVersionList([...selectValue.versions]);
                                }}
                            >
                                <option disabled value="select"> select</option>
                                {templateData.map((v, i) => (
                                    <option key={i} data-options={v.options} value={JSON.stringify(v)}>{v.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label className="mr-sm-2" for="version">Version*</Label>
                            <Input
                                type="select"
                                name="version" id="version"
                                defaultValue="select">
                                <option disabled value="select"> select</option>
                                {versionList && versionList.map((v, i) => (
                                    <option key={i} value={v}>{v}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label className="mr-sm-2" for="form-url">URL*</Label>
                            <Input
                                type="text"
                                name="url"
                                id="form-url"
                            >
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3" >
                        <FormGroup >
                            {!!isTemplateLoading && <img className="loading" src={loading}></img>}
                            <Button className="mb-2 mr-sm-2 mb-sm-0" type="submit">Submit</Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
export default URLForm;