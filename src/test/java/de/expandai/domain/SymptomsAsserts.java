package de.expandai.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class SymptomsAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSymptomsAllPropertiesEquals(Symptoms expected, Symptoms actual) {
        assertSymptomsAutoGeneratedPropertiesEquals(expected, actual);
        assertSymptomsAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSymptomsAllUpdatablePropertiesEquals(Symptoms expected, Symptoms actual) {
        assertSymptomsUpdatableFieldsEquals(expected, actual);
        assertSymptomsUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSymptomsAutoGeneratedPropertiesEquals(Symptoms expected, Symptoms actual) {
        assertThat(expected)
            .as("Verify Symptoms auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSymptomsUpdatableFieldsEquals(Symptoms expected, Symptoms actual) {
        assertThat(expected)
            .as("Verify Symptoms relevant properties")
            .satisfies(e -> assertThat(e.getTime()).as("check time").isEqualTo(actual.getTime()))
            .satisfies(e -> assertThat(e.getStatus()).as("check status").isEqualTo(actual.getStatus()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSymptomsUpdatableRelationshipsEquals(Symptoms expected, Symptoms actual) {
        assertThat(expected)
            .as("Verify Symptoms relationships")
            .satisfies(e -> assertThat(e.getPatient()).as("check patient").isEqualTo(actual.getPatient()));
    }
}