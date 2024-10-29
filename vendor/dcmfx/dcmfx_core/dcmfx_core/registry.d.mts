import type * as $option from "../../gleam_stdlib/gleam/option.d.mts";
import type * as $data_element_tag from "../dcmfx_core/data_element_tag.d.mts";
import type * as $value_multiplicity from "../dcmfx_core/value_multiplicity.d.mts";
import type * as $value_representation from "../dcmfx_core/value_representation.d.mts";
import type * as _ from "../gleam.d.mts";

export class Item extends _.CustomType {
  constructor(
    tag: $data_element_tag.DataElementTag$,
    name: string,
    vrs: _.List<$value_representation.ValueRepresentation$>,
    multiplicity: $value_multiplicity.ValueMultiplicity$
  );
  
  tag: $data_element_tag.DataElementTag$;
  name: string;
  vrs: _.List<$value_representation.ValueRepresentation$>;
  multiplicity: $value_multiplicity.ValueMultiplicity$;
}

export type Item$ = Item;

export function uid_name(uid: string): _.Result<string, undefined>;

export const file_meta_information_group_length: Item$;

export const file_meta_information_version: Item$;

export const media_storage_sop_class_uid: Item$;

export const media_storage_sop_instance_uid: Item$;

export const transfer_syntax_uid: Item$;

export const implementation_class_uid: Item$;

export const implementation_version_name: Item$;

export const source_application_entity_title: Item$;

export const sending_application_entity_title: Item$;

export const receiving_application_entity_title: Item$;

export const source_presentation_address: Item$;

export const sending_presentation_address: Item$;

export const receiving_presentation_address: Item$;

export const rtv_meta_information_version: Item$;

export const rtv_communication_sop_class_uid: Item$;

export const rtv_communication_sop_instance_uid: Item$;

export const rtv_source_identifier: Item$;

export const rtv_flow_identifier: Item$;

export const rtv_flow_rtp_sampling_rate: Item$;

export const rtv_flow_actual_frame_duration: Item$;

export const private_information_creator_uid: Item$;

export const private_information: Item$;

export const file_set_id: Item$;

export const file_set_descriptor_file_id: Item$;

export const specific_character_set_of_file_set_descriptor_file: Item$;

export const offset_of_the_first_directory_record_of_the_root_directory_entity: Item$;

export const offset_of_the_last_directory_record_of_the_root_directory_entity: Item$;

export const file_set_consistency_flag: Item$;

export const directory_record_sequence: Item$;

export const offset_of_the_next_directory_record: Item$;

export const record_in_use_flag: Item$;

export const offset_of_referenced_lower_level_directory_entity: Item$;

export const directory_record_type: Item$;

export const private_record_uid: Item$;

export const referenced_file_id: Item$;

export const mrdr_directory_record_offset: Item$;

export const referenced_sop_class_uid_in_file: Item$;

export const referenced_sop_instance_uid_in_file: Item$;

export const referenced_transfer_syntax_uid_in_file: Item$;

export const referenced_related_general_sop_class_uid_in_file: Item$;

export const number_of_references: Item$;

export const current_frame_functional_groups_sequence: Item$;

export const length_to_end: Item$;

export const specific_character_set: Item$;

export const language_code_sequence: Item$;

export const image_type: Item$;

export const recognition_code: Item$;

export const instance_creation_date: Item$;

export const instance_creation_time: Item$;

export const instance_creator_uid: Item$;

export const instance_coercion_date_time: Item$;

export const sop_class_uid: Item$;

export const acquisition_uid: Item$;

export const sop_instance_uid: Item$;

export const pyramid_uid: Item$;

export const related_general_sop_class_uid: Item$;

export const original_specialized_sop_class_uid: Item$;

export const synthetic_data: Item$;

export const study_date: Item$;

export const series_date: Item$;

export const acquisition_date: Item$;

export const content_date: Item$;

export const overlay_date: Item$;

export const curve_date: Item$;

export const acquisition_date_time: Item$;

export const study_time: Item$;

export const series_time: Item$;

export const acquisition_time: Item$;

export const content_time: Item$;

export const overlay_time: Item$;

export const curve_time: Item$;

export const data_set_type: Item$;

export const data_set_subtype: Item$;

export const nuclear_medicine_series_type: Item$;

export const accession_number: Item$;

export const issuer_of_accession_number_sequence: Item$;

export const query_retrieve_level: Item$;

export const query_retrieve_view: Item$;

export const retrieve_ae_title: Item$;

export const station_ae_title: Item$;

export const instance_availability: Item$;

export const failed_sop_instance_uid_list: Item$;

export const modality: Item$;

export const modalities_in_study: Item$;

export const sop_classes_in_study: Item$;

export const anatomic_regions_in_study_code_sequence: Item$;

export const conversion_type: Item$;

export const presentation_intent_type: Item$;

export const manufacturer: Item$;

export const institution_name: Item$;

export const institution_address: Item$;

export const institution_code_sequence: Item$;

export const referring_physician_name: Item$;

export const referring_physician_address: Item$;

export const referring_physician_telephone_numbers: Item$;

export const referring_physician_identification_sequence: Item$;

export const consulting_physician_name: Item$;

export const consulting_physician_identification_sequence: Item$;

export const code_value: Item$;

export const extended_code_value: Item$;

export const coding_scheme_designator: Item$;

export const coding_scheme_version: Item$;

export const code_meaning: Item$;

export const mapping_resource: Item$;

export const context_group_version: Item$;

export const context_group_local_version: Item$;

export const extended_code_meaning: Item$;

export const coding_scheme_resources_sequence: Item$;

export const coding_scheme_url_type: Item$;

export const context_group_extension_flag: Item$;

export const coding_scheme_uid: Item$;

export const context_group_extension_creator_uid: Item$;

export const coding_scheme_url: Item$;

export const context_identifier: Item$;

export const coding_scheme_identification_sequence: Item$;

export const coding_scheme_registry: Item$;

export const coding_scheme_external_id: Item$;

export const coding_scheme_name: Item$;

export const coding_scheme_responsible_organization: Item$;

export const context_uid: Item$;

export const mapping_resource_uid: Item$;

export const long_code_value: Item$;

export const urn_code_value: Item$;

export const equivalent_code_sequence: Item$;

export const mapping_resource_name: Item$;

export const context_group_identification_sequence: Item$;

export const mapping_resource_identification_sequence: Item$;

export const timezone_offset_from_utc: Item$;

export const responsible_group_code_sequence: Item$;

export const equipment_modality: Item$;

export const manufacturer_related_model_group: Item$;

export const private_data_element_characteristics_sequence: Item$;

export const private_group_reference: Item$;

export const private_creator_reference: Item$;

export const block_identifying_information_status: Item$;

export const nonidentifying_private_elements: Item$;

export const deidentification_action_sequence: Item$;

export const identifying_private_elements: Item$;

export const deidentification_action: Item$;

export const private_data_element: Item$;

export const private_data_element_value_multiplicity: Item$;

export const private_data_element_value_representation: Item$;

export const private_data_element_number_of_items: Item$;

export const private_data_element_name: Item$;

export const private_data_element_keyword: Item$;

export const private_data_element_description: Item$;

export const private_data_element_encoding: Item$;

export const private_data_element_definition_sequence: Item$;

export const scope_of_inventory_sequence: Item$;

export const inventory_purpose: Item$;

export const inventory_instance_description: Item$;

export const inventory_level: Item$;

export const item_inventory_date_time: Item$;

export const removed_from_operational_use: Item$;

export const reason_for_removal_code_sequence: Item$;

export const stored_instance_base_uri: Item$;

export const folder_access_uri: Item$;

export const file_access_uri: Item$;

export const container_file_type: Item$;

export const filename_in_container: Item$;

export const file_offset_in_container: Item$;

export const file_length_in_container: Item$;

export const stored_instance_transfer_syntax_uid: Item$;

export const extended_matching_mechanisms: Item$;

export const range_matching_sequence: Item$;

export const list_of_uid_matching_sequence: Item$;

export const empty_value_matching_sequence: Item$;

export const general_matching_sequence: Item$;

export const requested_status_interval: Item$;

export const retain_instances: Item$;

export const expiration_date_time: Item$;

export const transaction_status: Item$;

export const transaction_status_comment: Item$;

export const file_set_access_sequence: Item$;

export const file_access_sequence: Item$;

export const record_key: Item$;

export const prior_record_key: Item$;

export const metadata_sequence: Item$;

export const updated_metadata_sequence: Item$;

export const study_update_date_time: Item$;

export const inventory_access_end_points_sequence: Item$;

export const study_access_end_points_sequence: Item$;

export const incorporated_inventory_instance_sequence: Item$;

export const inventoried_studies_sequence: Item$;

export const inventoried_series_sequence: Item$;

export const inventoried_instances_sequence: Item$;

export const inventory_completion_status: Item$;

export const number_of_study_records_in_instance: Item$;

export const total_number_of_study_records: Item$;

export const maximum_number_of_records: Item$;

export const network_id: Item$;

export const station_name: Item$;

export const study_description: Item$;

export const procedure_code_sequence: Item$;

export const series_description: Item$;

export const series_description_code_sequence: Item$;

export const institutional_department_name: Item$;

export const institutional_department_type_code_sequence: Item$;

export const physicians_of_record: Item$;

export const physicians_of_record_identification_sequence: Item$;

export const performing_physician_name: Item$;

export const performing_physician_identification_sequence: Item$;

export const name_of_physicians_reading_study: Item$;

export const physicians_reading_study_identification_sequence: Item$;

export const operators_name: Item$;

export const operator_identification_sequence: Item$;

export const admitting_diagnoses_description: Item$;

export const admitting_diagnoses_code_sequence: Item$;

export const pyramid_description: Item$;

export const manufacturer_model_name: Item$;

export const referenced_results_sequence: Item$;

export const referenced_study_sequence: Item$;

export const referenced_performed_procedure_step_sequence: Item$;

export const referenced_instances_by_sop_class_sequence: Item$;

export const referenced_series_sequence: Item$;

export const referenced_patient_sequence: Item$;

export const referenced_visit_sequence: Item$;

export const referenced_overlay_sequence: Item$;

export const referenced_stereometric_instance_sequence: Item$;

export const referenced_waveform_sequence: Item$;

export const referenced_image_sequence: Item$;

export const referenced_curve_sequence: Item$;

export const referenced_instance_sequence: Item$;

export const referenced_real_world_value_mapping_instance_sequence: Item$;

export const referenced_sop_class_uid: Item$;

export const referenced_sop_instance_uid: Item$;

export const definition_source_sequence: Item$;

export const sop_classes_supported: Item$;

export const referenced_frame_number: Item$;

export const simple_frame_list: Item$;

export const calculated_frame_list: Item$;

export const time_range: Item$;

export const frame_extraction_sequence: Item$;

export const multi_frame_source_sop_instance_uid: Item$;

export const retrieve_url: Item$;

export const transaction_uid: Item$;

export const warning_reason: Item$;

export const failure_reason: Item$;

export const failed_sop_sequence: Item$;

export const referenced_sop_sequence: Item$;

export const other_failures_sequence: Item$;

export const failed_study_sequence: Item$;

export const studies_containing_other_referenced_instances_sequence: Item$;

export const related_series_sequence: Item$;

export const lossy_image_compression_retired: Item$;

export const derivation_description: Item$;

export const source_image_sequence: Item$;

export const stage_name: Item$;

export const stage_number: Item$;

export const number_of_stages: Item$;

export const view_name: Item$;

export const view_number: Item$;

export const number_of_event_timers: Item$;

export const number_of_views_in_stage: Item$;

export const event_elapsed_times: Item$;

export const event_timer_names: Item$;

export const event_timer_sequence: Item$;

export const event_time_offset: Item$;

export const event_code_sequence: Item$;

export const start_trim: Item$;

export const stop_trim: Item$;

export const recommended_display_frame_rate: Item$;

export const transducer_position: Item$;

export const transducer_orientation: Item$;

export const anatomic_structure: Item$;

export const anatomic_region_sequence: Item$;

export const anatomic_region_modifier_sequence: Item$;

export const primary_anatomic_structure_sequence: Item$;

export const anatomic_structure_space_or_region_sequence: Item$;

export const primary_anatomic_structure_modifier_sequence: Item$;

export const transducer_position_sequence: Item$;

export const transducer_position_modifier_sequence: Item$;

export const transducer_orientation_sequence: Item$;

export const transducer_orientation_modifier_sequence: Item$;

export const anatomic_structure_space_or_region_code_sequence_trial: Item$;

export const anatomic_portal_of_entrance_code_sequence_trial: Item$;

export const anatomic_approach_direction_code_sequence_trial: Item$;

export const anatomic_perspective_description_trial: Item$;

export const anatomic_perspective_code_sequence_trial: Item$;

export const anatomic_location_of_examining_instrument_description_trial: Item$;

export const anatomic_location_of_examining_instrument_code_sequence_trial: Item$;

export const anatomic_structure_space_or_region_modifier_code_sequence_trial: Item$;

export const on_axis_background_anatomic_structure_code_sequence_trial: Item$;

export const alternate_representation_sequence: Item$;

export const available_transfer_syntax_uid: Item$;

export const irradiation_event_uid: Item$;

export const source_irradiation_event_sequence: Item$;

export const radiopharmaceutical_administration_event_uid: Item$;

export const identifying_comments: Item$;

export const frame_type: Item$;

export const referenced_image_evidence_sequence: Item$;

export const referenced_raw_data_sequence: Item$;

export const creator_version_uid: Item$;

export const derivation_image_sequence: Item$;

export const source_image_evidence_sequence: Item$;

export const pixel_presentation: Item$;

export const volumetric_properties: Item$;

export const volume_based_calculation_technique: Item$;

export const complex_image_component: Item$;

export const acquisition_contrast: Item$;

export const derivation_code_sequence: Item$;

export const referenced_presentation_state_sequence: Item$;

export const referenced_other_plane_sequence: Item$;

export const frame_display_sequence: Item$;

export const recommended_display_frame_rate_in_float: Item$;

export const skip_frame_range_flag: Item$;

export const patient_name: Item$;

export const patient_id: Item$;

export const issuer_of_patient_id: Item$;

export const type_of_patient_id: Item$;

export const issuer_of_patient_id_qualifiers_sequence: Item$;

export const source_patient_group_identification_sequence: Item$;

export const group_of_patients_identification_sequence: Item$;

export const subject_relative_position_in_image: Item$;

export const patient_birth_date: Item$;

export const patient_birth_time: Item$;

export const patient_birth_date_in_alternative_calendar: Item$;

export const patient_death_date_in_alternative_calendar: Item$;

export const patient_alternative_calendar: Item$;

export const patient_sex: Item$;

export const patient_insurance_plan_code_sequence: Item$;

export const patient_primary_language_code_sequence: Item$;

export const patient_primary_language_modifier_code_sequence: Item$;

export const quality_control_subject: Item$;

export const quality_control_subject_type_code_sequence: Item$;

export const strain_description: Item$;

export const strain_nomenclature: Item$;

export const strain_stock_number: Item$;

export const strain_source_registry_code_sequence: Item$;

export const strain_stock_sequence: Item$;

export const strain_source: Item$;

export const strain_additional_information: Item$;

export const strain_code_sequence: Item$;

export const genetic_modifications_sequence: Item$;

export const genetic_modifications_description: Item$;

export const genetic_modifications_nomenclature: Item$;

export const genetic_modifications_code_sequence: Item$;

export const other_patient_ids: Item$;

export const other_patient_names: Item$;

export const other_patient_ids_sequence: Item$;

export const patient_birth_name: Item$;

export const patient_age: Item$;

export const patient_size: Item$;

export const patient_size_code_sequence: Item$;

export const patient_body_mass_index: Item$;

export const measured_ap_dimension: Item$;

export const measured_lateral_dimension: Item$;

export const patient_weight: Item$;

export const patient_address: Item$;

export const insurance_plan_identification: Item$;

export const patient_mother_birth_name: Item$;

export const military_rank: Item$;

export const branch_of_service: Item$;

export const medical_record_locator: Item$;

export const referenced_patient_photo_sequence: Item$;

export const medical_alerts: Item$;

export const allergies: Item$;

export const country_of_residence: Item$;

export const region_of_residence: Item$;

export const patient_telephone_numbers: Item$;

export const patient_telecom_information: Item$;

export const ethnic_group: Item$;

export const occupation: Item$;

export const smoking_status: Item$;

export const additional_patient_history: Item$;

export const pregnancy_status: Item$;

export const last_menstrual_date: Item$;

export const patient_religious_preference: Item$;

export const patient_species_description: Item$;

export const patient_species_code_sequence: Item$;

export const patient_sex_neutered: Item$;

export const anatomical_orientation_type: Item$;

export const patient_breed_description: Item$;

export const patient_breed_code_sequence: Item$;

export const breed_registration_sequence: Item$;

export const breed_registration_number: Item$;

export const breed_registry_code_sequence: Item$;

export const responsible_person: Item$;

export const responsible_person_role: Item$;

export const responsible_organization: Item$;

export const patient_comments: Item$;

export const examined_body_thickness: Item$;

export const clinical_trial_sponsor_name: Item$;

export const clinical_trial_protocol_id: Item$;

export const clinical_trial_protocol_name: Item$;

export const issuer_of_clinical_trial_protocol_id: Item$;

export const other_clinical_trial_protocol_ids_sequence: Item$;

export const clinical_trial_site_id: Item$;

export const clinical_trial_site_name: Item$;

export const issuer_of_clinical_trial_site_id: Item$;

export const clinical_trial_subject_id: Item$;

export const issuer_of_clinical_trial_subject_id: Item$;

export const clinical_trial_subject_reading_id: Item$;

export const issuer_of_clinical_trial_subject_reading_id: Item$;

export const clinical_trial_time_point_id: Item$;

export const clinical_trial_time_point_description: Item$;

export const longitudinal_temporal_offset_from_event: Item$;

export const longitudinal_temporal_event_type: Item$;

export const clinical_trial_time_point_type_code_sequence: Item$;

export const issuer_of_clinical_trial_time_point_id: Item$;

export const clinical_trial_coordinating_center_name: Item$;

export const patient_identity_removed: Item$;

export const deidentification_method: Item$;

export const deidentification_method_code_sequence: Item$;

export const clinical_trial_series_id: Item$;

export const clinical_trial_series_description: Item$;

export const issuer_of_clinical_trial_series_id: Item$;

export const clinical_trial_protocol_ethics_committee_name: Item$;

export const clinical_trial_protocol_ethics_committee_approval_number: Item$;

export const consent_for_clinical_trial_use_sequence: Item$;

export const distribution_type: Item$;

export const consent_for_distribution_flag: Item$;

export const ethics_committee_approval_effectiveness_start_date: Item$;

export const ethics_committee_approval_effectiveness_end_date: Item$;

export const cad_file_format: Item$;

export const component_reference_system: Item$;

export const component_manufacturing_procedure: Item$;

export const component_manufacturer: Item$;

export const material_thickness: Item$;

export const material_pipe_diameter: Item$;

export const material_isolation_diameter: Item$;

export const material_grade: Item$;

export const material_properties_description: Item$;

export const material_properties_file_format_retired: Item$;

export const material_notes: Item$;

export const component_shape: Item$;

export const curvature_type: Item$;

export const outer_diameter: Item$;

export const inner_diameter: Item$;

export const component_welder_ids: Item$;

export const secondary_approval_status: Item$;

export const secondary_review_date: Item$;

export const secondary_review_time: Item$;

export const secondary_reviewer_name: Item$;

export const repair_id: Item$;

export const multiple_component_approval_sequence: Item$;

export const other_approval_status: Item$;

export const other_secondary_approval_status: Item$;

export const data_element_label_sequence: Item$;

export const data_element_label_item_sequence: Item$;

export const data_element: Item$;

export const data_element_name: Item$;

export const data_element_description: Item$;

export const data_element_conditionality: Item$;

export const data_element_minimum_characters: Item$;

export const data_element_maximum_characters: Item$;

export const actual_environmental_conditions: Item$;

export const expiry_date: Item$;

export const environmental_conditions: Item$;

export const evaluator_sequence: Item$;

export const evaluator_number: Item$;

export const evaluator_name: Item$;

export const evaluation_attempt: Item$;

export const indication_sequence: Item$;

export const indication_number: Item$;

export const indication_label: Item$;

export const indication_description: Item$;

export const indication_type: Item$;

export const indication_disposition: Item$;

export const indication_roi_sequence: Item$;

export const indication_physical_property_sequence: Item$;

export const property_label: Item$;

export const coordinate_system_number_of_axes: Item$;

export const coordinate_system_axes_sequence: Item$;

export const coordinate_system_axis_description: Item$;

export const coordinate_system_data_set_mapping: Item$;

export const coordinate_system_axis_number: Item$;

export const coordinate_system_axis_type: Item$;

export const coordinate_system_axis_units: Item$;

export const coordinate_system_axis_values: Item$;

export const coordinate_system_transform_sequence: Item$;

export const transform_description: Item$;

export const transform_number_of_axes: Item$;

export const transform_order_of_axes: Item$;

export const transformed_axis_units: Item$;

export const coordinate_system_transform_rotation_and_scale_matrix: Item$;

export const coordinate_system_transform_translation_matrix: Item$;

export const internal_detector_frame_time: Item$;

export const number_of_frames_integrated: Item$;

export const detector_temperature_sequence: Item$;

export const sensor_name: Item$;

export const horizontal_offset_of_sensor: Item$;

export const vertical_offset_of_sensor: Item$;

export const sensor_temperature: Item$;

export const dark_current_sequence: Item$;

export const dark_current_counts: Item$;

export const gain_correction_reference_sequence: Item$;

export const air_counts: Item$;

export const kv_used_in_gain_calibration: Item$;

export const ma_used_in_gain_calibration: Item$;

export const number_of_frames_used_for_integration: Item$;

export const filter_material_used_in_gain_calibration: Item$;

export const filter_thickness_used_in_gain_calibration: Item$;

export const date_of_gain_calibration: Item$;

export const time_of_gain_calibration: Item$;

export const bad_pixel_image: Item$;

export const calibration_notes: Item$;

export const linearity_correction_technique: Item$;

export const beam_hardening_correction_technique: Item$;

export const pulser_equipment_sequence: Item$;

export const pulser_type: Item$;

export const pulser_notes: Item$;

export const receiver_equipment_sequence: Item$;

export const amplifier_type: Item$;

export const receiver_notes: Item$;

export const pre_amplifier_equipment_sequence: Item$;

export const pre_amplifier_notes: Item$;

export const transmit_transducer_sequence: Item$;

export const receive_transducer_sequence: Item$;

export const number_of_elements: Item$;

export const element_shape: Item$;

export const element_dimension_a: Item$;

export const element_dimension_b: Item$;

export const element_pitch_a: Item$;

export const measured_beam_dimension_a: Item$;

export const measured_beam_dimension_b: Item$;

export const location_of_measured_beam_diameter: Item$;

export const nominal_frequency: Item$;

export const measured_center_frequency: Item$;

export const measured_bandwidth: Item$;

export const element_pitch_b: Item$;

export const pulser_settings_sequence: Item$;

export const pulse_width: Item$;

export const excitation_frequency: Item$;

export const modulation_type: Item$;

export const damping: Item$;

export const receiver_settings_sequence: Item$;

export const acquired_soundpath_length: Item$;

export const acquisition_compression_type: Item$;

export const acquisition_sample_size: Item$;

export const rectifier_smoothing: Item$;

export const dac_sequence: Item$;

export const dac_type: Item$;

export const dac_gain_points: Item$;

export const dac_time_points: Item$;

export const dac_amplitude: Item$;

export const pre_amplifier_settings_sequence: Item$;

export const transmit_transducer_settings_sequence: Item$;

export const receive_transducer_settings_sequence: Item$;

export const incident_angle: Item$;

export const coupling_technique: Item$;

export const coupling_medium: Item$;

export const coupling_velocity: Item$;

export const probe_center_location_x: Item$;

export const probe_center_location_z: Item$;

export const sound_path_length: Item$;

export const delay_law_identifier: Item$;

export const gate_settings_sequence: Item$;

export const gate_threshold: Item$;

export const velocity_of_sound: Item$;

export const calibration_settings_sequence: Item$;

export const calibration_procedure: Item$;

export const procedure_version: Item$;

export const procedure_creation_date: Item$;

export const procedure_expiration_date: Item$;

export const procedure_last_modified_date: Item$;

export const calibration_time: Item$;

export const calibration_date: Item$;

export const probe_drive_equipment_sequence: Item$;

export const drive_type: Item$;

export const probe_drive_notes: Item$;

export const drive_probe_sequence: Item$;

export const probe_inductance: Item$;

export const probe_resistance: Item$;

export const receive_probe_sequence: Item$;

export const probe_drive_settings_sequence: Item$;

export const bridge_resistors: Item$;

export const probe_orientation_angle: Item$;

export const user_selected_gain_y: Item$;

export const user_selected_phase: Item$;

export const user_selected_offset_x: Item$;

export const user_selected_offset_y: Item$;

export const channel_settings_sequence: Item$;

export const channel_threshold: Item$;

export const scanner_settings_sequence: Item$;

export const scan_procedure: Item$;

export const translation_rate_x: Item$;

export const translation_rate_y: Item$;

export const channel_overlap: Item$;

export const image_quality_indicator_type: Item$;

export const image_quality_indicator_material: Item$;

export const image_quality_indicator_size: Item$;

export const linac_energy: Item$;

export const linac_output: Item$;

export const active_aperture: Item$;

export const total_aperture: Item$;

export const aperture_elevation: Item$;

export const main_lobe_angle: Item$;

export const main_roof_angle: Item$;

export const connector_type: Item$;

export const wedge_model_number: Item$;

export const wedge_angle_float: Item$;

export const wedge_roof_angle: Item$;

export const wedge_element_1_position: Item$;

export const wedge_material_velocity: Item$;

export const wedge_material: Item$;

export const wedge_offset_z: Item$;

export const wedge_origin_offset_x: Item$;

export const wedge_time_delay: Item$;

export const wedge_name: Item$;

export const wedge_manufacturer_name: Item$;

export const wedge_description: Item$;

export const nominal_beam_angle: Item$;

export const wedge_offset_x: Item$;

export const wedge_offset_y: Item$;

export const wedge_total_length: Item$;

export const wedge_in_contact_length: Item$;

export const wedge_front_gap: Item$;

export const wedge_total_height: Item$;

export const wedge_front_height: Item$;

export const wedge_rear_height: Item$;

export const wedge_total_width: Item$;

export const wedge_in_contact_width: Item$;

export const wedge_chamfer_height: Item$;

export const wedge_curve: Item$;

export const radius_along_wedge: Item$;

export const white_point: Item$;

export const primary_chromaticities: Item$;

export const battery_level: Item$;

export const exposure_time_in_seconds: Item$;

export const f_number: Item$;

export const oecf_rows: Item$;

export const oecf_columns: Item$;

export const oecf_column_names: Item$;

export const oecf_values: Item$;

export const spatial_frequency_response_rows: Item$;

export const spatial_frequency_response_columns: Item$;

export const spatial_frequency_response_column_names: Item$;

export const spatial_frequency_response_values: Item$;

export const color_filter_array_pattern_rows: Item$;

export const color_filter_array_pattern_columns: Item$;

export const color_filter_array_pattern_values: Item$;

export const flash_firing_status: Item$;

export const flash_return_status: Item$;

export const flash_mode: Item$;

export const flash_function_present: Item$;

export const flash_red_eye_mode: Item$;

export const exposure_program: Item$;

export const spectral_sensitivity: Item$;

export const photographic_sensitivity: Item$;

export const self_timer_mode: Item$;

export const sensitivity_type: Item$;

export const standard_output_sensitivity: Item$;

export const recommended_exposure_index: Item$;

export const iso_speed: Item$;

export const iso_speed_latitude_yyy: Item$;

export const iso_speed_latitude_zzz: Item$;

export const exif_version: Item$;

export const shutter_speed_value: Item$;

export const aperture_value: Item$;

export const brightness_value: Item$;

export const exposure_bias_value: Item$;

export const max_aperture_value: Item$;

export const subject_distance: Item$;

export const metering_mode: Item$;

export const light_source: Item$;

export const focal_length: Item$;

export const subject_area: Item$;

export const maker_note: Item$;

export const temperature: Item$;

export const humidity: Item$;

export const pressure: Item$;

export const water_depth: Item$;

export const acceleration: Item$;

export const camera_elevation_angle: Item$;

export const flash_energy: Item$;

export const subject_location: Item$;

export const photographic_exposure_index: Item$;

export const sensing_method: Item$;

export const file_source: Item$;

export const scene_type: Item$;

export const custom_rendered: Item$;

export const exposure_mode: Item$;

export const white_balance: Item$;

export const digital_zoom_ratio: Item$;

export const focal_length_in_3_5mm_film: Item$;

export const scene_capture_type: Item$;

export const gain_control: Item$;

export const contrast: Item$;

export const saturation: Item$;

export const sharpness: Item$;

export const device_setting_description: Item$;

export const subject_distance_range: Item$;

export const camera_owner_name: Item$;

export const lens_specification: Item$;

export const lens_make: Item$;

export const lens_model: Item$;

export const lens_serial_number: Item$;

export const interoperability_index: Item$;

export const interoperability_version: Item$;

export const gps_version_id: Item$;

export const gps_latitude_ref: Item$;

export const gps_latitude: Item$;

export const gps_longitude_ref: Item$;

export const gps_longitude: Item$;

export const gps_altitude_ref: Item$;

export const gps_altitude: Item$;

export const gps_time_stamp: Item$;

export const gps_satellites: Item$;

export const gps_status: Item$;

export const gps_measure_mode: Item$;

export const gpsdop: Item$;

export const gps_speed_ref: Item$;

export const gps_speed: Item$;

export const gps_track_ref: Item$;

export const gps_track: Item$;

export const gps_img_direction_ref: Item$;

export const gps_img_direction: Item$;

export const gps_map_datum: Item$;

export const gps_dest_latitude_ref: Item$;

export const gps_dest_latitude: Item$;

export const gps_dest_longitude_ref: Item$;

export const gps_dest_longitude: Item$;

export const gps_dest_bearing_ref: Item$;

export const gps_dest_bearing: Item$;

export const gps_dest_distance_ref: Item$;

export const gps_dest_distance: Item$;

export const gps_processing_method: Item$;

export const gps_area_information: Item$;

export const gps_date_stamp: Item$;

export const gps_differential: Item$;

export const light_source_polarization: Item$;

export const emitter_color_temperature: Item$;

export const contact_method: Item$;

export const immersion_media: Item$;

export const optical_magnification_factor: Item$;

export const contrast_bolus_agent: Item$;

export const contrast_bolus_agent_sequence: Item$;

export const contrast_bolus_t1_relaxivity: Item$;

export const contrast_bolus_administration_route_sequence: Item$;

export const body_part_examined: Item$;

export const scanning_sequence: Item$;

export const sequence_variant: Item$;

export const scan_options: Item$;

export const mr_acquisition_type: Item$;

export const sequence_name: Item$;

export const angio_flag: Item$;

export const intervention_drug_information_sequence: Item$;

export const intervention_drug_stop_time: Item$;

export const intervention_drug_dose: Item$;

export const intervention_drug_code_sequence: Item$;

export const additional_drug_sequence: Item$;

export const radionuclide: Item$;

export const radiopharmaceutical: Item$;

export const energy_window_centerline: Item$;

export const energy_window_total_width: Item$;

export const intervention_drug_name: Item$;

export const intervention_drug_start_time: Item$;

export const intervention_sequence: Item$;

export const therapy_type: Item$;

export const intervention_status: Item$;

export const therapy_description: Item$;

export const intervention_description: Item$;

export const cine_rate: Item$;

export const initial_cine_run_state: Item$;

export const slice_thickness: Item$;

export const kvp: Item$;

export const counts_accumulated: Item$;

export const acquisition_termination_condition: Item$;

export const effective_duration: Item$;

export const acquisition_start_condition: Item$;

export const acquisition_start_condition_data: Item$;

export const acquisition_termination_condition_data: Item$;

export const repetition_time: Item$;

export const echo_time: Item$;

export const inversion_time: Item$;

export const number_of_averages: Item$;

export const imaging_frequency: Item$;

export const imaged_nucleus: Item$;

export const echo_numbers: Item$;

export const magnetic_field_strength: Item$;

export const spacing_between_slices: Item$;

export const number_of_phase_encoding_steps: Item$;

export const data_collection_diameter: Item$;

export const echo_train_length: Item$;

export const percent_sampling: Item$;

export const percent_phase_field_of_view: Item$;

export const pixel_bandwidth: Item$;

export const device_serial_number: Item$;

export const device_uid: Item$;

export const device_id: Item$;

export const plate_id: Item$;

export const generator_id: Item$;

export const grid_id: Item$;

export const cassette_id: Item$;

export const gantry_id: Item$;

export const unique_device_identifier: Item$;

export const udi_sequence: Item$;

export const manufacturer_device_class_uid: Item$;

export const secondary_capture_device_id: Item$;

export const hardcopy_creation_device_id: Item$;

export const date_of_secondary_capture: Item$;

export const time_of_secondary_capture: Item$;

export const secondary_capture_device_manufacturer: Item$;

export const hardcopy_device_manufacturer: Item$;

export const secondary_capture_device_manufacturer_model_name: Item$;

export const secondary_capture_device_software_versions: Item$;

export const hardcopy_device_software_version: Item$;

export const hardcopy_device_manufacturer_model_name: Item$;

export const software_versions: Item$;

export const video_image_format_acquired: Item$;

export const digital_image_format_acquired: Item$;

export const protocol_name: Item$;

export const contrast_bolus_route: Item$;

export const contrast_bolus_volume: Item$;

export const contrast_bolus_start_time: Item$;

export const contrast_bolus_stop_time: Item$;

export const contrast_bolus_total_dose: Item$;

export const syringe_counts: Item$;

export const contrast_flow_rate: Item$;

export const contrast_flow_duration: Item$;

export const contrast_bolus_ingredient: Item$;

export const contrast_bolus_ingredient_concentration: Item$;

export const spatial_resolution: Item$;

export const trigger_time: Item$;

export const trigger_source_or_type: Item$;

export const nominal_interval: Item$;

export const frame_time: Item$;

export const cardiac_framing_type: Item$;

export const frame_time_vector: Item$;

export const frame_delay: Item$;

export const image_trigger_delay: Item$;

export const multiplex_group_time_offset: Item$;

export const trigger_time_offset: Item$;

export const synchronization_trigger: Item$;

export const synchronization_channel: Item$;

export const trigger_sample_position: Item$;

export const radiopharmaceutical_route: Item$;

export const radiopharmaceutical_volume: Item$;

export const radiopharmaceutical_start_time: Item$;

export const radiopharmaceutical_stop_time: Item$;

export const radionuclide_total_dose: Item$;

export const radionuclide_half_life: Item$;

export const radionuclide_positron_fraction: Item$;

export const radiopharmaceutical_specific_activity: Item$;

export const radiopharmaceutical_start_date_time: Item$;

export const radiopharmaceutical_stop_date_time: Item$;

export const beat_rejection_flag: Item$;

export const low_rr_value: Item$;

export const high_rr_value: Item$;

export const intervals_acquired: Item$;

export const intervals_rejected: Item$;

export const pvc_rejection: Item$;

export const skip_beats: Item$;

export const heart_rate: Item$;

export const cardiac_number_of_images: Item$;

export const trigger_window: Item$;

export const reconstruction_diameter: Item$;

export const distance_source_to_detector: Item$;

export const distance_source_to_patient: Item$;

export const estimated_radiographic_magnification_factor: Item$;

export const gantry_detector_tilt: Item$;

export const gantry_detector_slew: Item$;

export const table_height: Item$;

export const table_traverse: Item$;

export const table_motion: Item$;

export const table_vertical_increment: Item$;

export const table_lateral_increment: Item$;

export const table_longitudinal_increment: Item$;

export const table_angle: Item$;

export const table_type: Item$;

export const rotation_direction: Item$;

export const angular_position: Item$;

export const radial_position: Item$;

export const scan_arc: Item$;

export const angular_step: Item$;

export const center_of_rotation_offset: Item$;

export const rotation_offset: Item$;

export const field_of_view_shape: Item$;

export const field_of_view_dimensions: Item$;

export const exposure_time: Item$;

export const x_ray_tube_current: Item$;

export const exposure: Item$;

export const exposure_in_microamp_seconds: Item$;

export const average_pulse_width: Item$;

export const radiation_setting: Item$;

export const rectification_type: Item$;

export const radiation_mode: Item$;

export const image_and_fluoroscopy_area_dose_product: Item$;

export const filter_type: Item$;

export const type_of_filters: Item$;

export const intensifier_size: Item$;

export const imager_pixel_spacing: Item$;

export const grid: Item$;

export const generator_power: Item$;

export const collimator_grid_name: Item$;

export const collimator_type: Item$;

export const focal_distance: Item$;

export const x_focus_center: Item$;

export const y_focus_center: Item$;

export const focal_spots: Item$;

export const anode_target_material: Item$;

export const body_part_thickness: Item$;

export const compression_force: Item$;

export const compression_pressure: Item$;

export const paddle_description: Item$;

export const compression_contact_area: Item$;

export const acquisition_mode: Item$;

export const dose_mode_name: Item$;

export const acquired_subtraction_mask_flag: Item$;

export const fluoroscopy_persistence_flag: Item$;

export const fluoroscopy_last_image_hold_persistence_flag: Item$;

export const upper_limit_number_of_persistent_fluoroscopy_frames: Item$;

export const contrast_bolus_auto_injection_trigger_flag: Item$;

export const contrast_bolus_injection_delay: Item$;

export const xa_acquisition_phase_details_sequence: Item$;

export const xa_acquisition_frame_rate: Item$;

export const xa_plane_details_sequence: Item$;

export const acquisition_field_of_view_label: Item$;

export const x_ray_filter_details_sequence: Item$;

export const xa_acquisition_duration: Item$;

export const reconstruction_pipeline_type: Item$;

export const image_filter_details_sequence: Item$;

export const applied_mask_subtraction_flag: Item$;

export const requested_series_description_code_sequence: Item$;

export const date_of_last_calibration: Item$;

export const time_of_last_calibration: Item$;

export const date_time_of_last_calibration: Item$;

export const calibration_date_time: Item$;

export const date_of_manufacture: Item$;

export const date_of_installation: Item$;

export const convolution_kernel: Item$;

export const upper_lower_pixel_values: Item$;

export const actual_frame_duration: Item$;

export const count_rate: Item$;

export const preferred_playback_sequencing: Item$;

export const receive_coil_name: Item$;

export const transmit_coil_name: Item$;

export const plate_type: Item$;

export const phosphor_type: Item$;

export const water_equivalent_diameter: Item$;

export const water_equivalent_diameter_calculation_method_code_sequence: Item$;

export const scan_velocity: Item$;

export const whole_body_technique: Item$;

export const scan_length: Item$;

export const acquisition_matrix: Item$;

export const in_plane_phase_encoding_direction: Item$;

export const flip_angle: Item$;

export const variable_flip_angle_flag: Item$;

export const sar: Item$;

export const d_bdt: Item$;

export const b_1rms: Item$;

export const acquisition_device_processing_description: Item$;

export const acquisition_device_processing_code: Item$;

export const cassette_orientation: Item$;

export const cassette_size: Item$;

export const exposures_on_plate: Item$;

export const relative_x_ray_exposure: Item$;

export const exposure_index: Item$;

export const target_exposure_index: Item$;

export const deviation_index: Item$;

export const column_angulation: Item$;

export const tomo_layer_height: Item$;

export const tomo_angle: Item$;

export const tomo_time: Item$;

export const tomo_type: Item$;

export const tomo_class: Item$;

export const number_of_tomosynthesis_source_images: Item$;

export const positioner_motion: Item$;

export const positioner_type: Item$;

export const positioner_primary_angle: Item$;

export const positioner_secondary_angle: Item$;

export const positioner_primary_angle_increment: Item$;

export const positioner_secondary_angle_increment: Item$;

export const detector_primary_angle: Item$;

export const detector_secondary_angle: Item$;

export const shutter_shape: Item$;

export const shutter_left_vertical_edge: Item$;

export const shutter_right_vertical_edge: Item$;

export const shutter_upper_horizontal_edge: Item$;

export const shutter_lower_horizontal_edge: Item$;

export const center_of_circular_shutter: Item$;

export const radius_of_circular_shutter: Item$;

export const vertices_of_the_polygonal_shutter: Item$;

export const shutter_presentation_value: Item$;

export const shutter_overlay_group: Item$;

export const shutter_presentation_color_cie_lab_value: Item$;

export const outline_shape_type: Item$;

export const outline_left_vertical_edge: Item$;

export const outline_right_vertical_edge: Item$;

export const outline_upper_horizontal_edge: Item$;

export const outline_lower_horizontal_edge: Item$;

export const center_of_circular_outline: Item$;

export const diameter_of_circular_outline: Item$;

export const number_of_polygonal_vertices: Item$;

export const vertices_of_the_polygonal_outline: Item$;

export const collimator_shape: Item$;

export const collimator_left_vertical_edge: Item$;

export const collimator_right_vertical_edge: Item$;

export const collimator_upper_horizontal_edge: Item$;

export const collimator_lower_horizontal_edge: Item$;

export const center_of_circular_collimator: Item$;

export const radius_of_circular_collimator: Item$;

export const vertices_of_the_polygonal_collimator: Item$;

export const acquisition_time_synchronized: Item$;

export const time_source: Item$;

export const time_distribution_protocol: Item$;

export const ntp_source_address: Item$;

export const page_number_vector: Item$;

export const frame_label_vector: Item$;

export const frame_primary_angle_vector: Item$;

export const frame_secondary_angle_vector: Item$;

export const slice_location_vector: Item$;

export const display_window_label_vector: Item$;

export const nominal_scanned_pixel_spacing: Item$;

export const digitizing_device_transport_direction: Item$;

export const rotation_of_scanned_film: Item$;

export const biopsy_target_sequence: Item$;

export const target_uid: Item$;

export const localizing_cursor_position: Item$;

export const calculated_target_position: Item$;

export const target_label: Item$;

export const displayed_z_value: Item$;

export const ivus_acquisition: Item$;

export const ivus_pullback_rate: Item$;

export const ivus_gated_rate: Item$;

export const ivus_pullback_start_frame_number: Item$;

export const ivus_pullback_stop_frame_number: Item$;

export const lesion_number: Item$;

export const acquisition_comments: Item$;

export const output_power: Item$;

export const transducer_data: Item$;

export const transducer_identification_sequence: Item$;

export const focus_depth: Item$;

export const processing_function: Item$;

export const postprocessing_function: Item$;

export const mechanical_index: Item$;

export const bone_thermal_index: Item$;

export const cranial_thermal_index: Item$;

export const soft_tissue_thermal_index: Item$;

export const soft_tissue_focus_thermal_index: Item$;

export const soft_tissue_surface_thermal_index: Item$;

export const dynamic_range: Item$;

export const total_gain: Item$;

export const depth_of_scan_field: Item$;

export const patient_position: Item$;

export const view_position: Item$;

export const projection_eponymous_name_code_sequence: Item$;

export const image_transformation_matrix: Item$;

export const image_translation_vector: Item$;

export const sensitivity: Item$;

export const sequence_of_ultrasound_regions: Item$;

export const region_spatial_format: Item$;

export const region_data_type: Item$;

export const region_flags: Item$;

export const region_location_min_x0: Item$;

export const region_location_min_y0: Item$;

export const region_location_max_x1: Item$;

export const region_location_max_y1: Item$;

export const reference_pixel_x0: Item$;

export const reference_pixel_y0: Item$;

export const physical_units_x_direction: Item$;

export const physical_units_y_direction: Item$;

export const reference_pixel_physical_value_x: Item$;

export const reference_pixel_physical_value_y: Item$;

export const physical_delta_x: Item$;

export const physical_delta_y: Item$;

export const transducer_frequency: Item$;

export const transducer_type: Item$;

export const pulse_repetition_frequency: Item$;

export const doppler_correction_angle: Item$;

export const steering_angle: Item$;

export const doppler_sample_volume_x_position_retired: Item$;

export const doppler_sample_volume_x_position: Item$;

export const doppler_sample_volume_y_position_retired: Item$;

export const doppler_sample_volume_y_position: Item$;

export const tm_line_position_x0_retired: Item$;

export const tm_line_position_x0: Item$;

export const tm_line_position_y0_retired: Item$;

export const tm_line_position_y0: Item$;

export const tm_line_position_x1_retired: Item$;

export const tm_line_position_x1: Item$;

export const tm_line_position_y1_retired: Item$;

export const tm_line_position_y1: Item$;

export const pixel_component_organization: Item$;

export const pixel_component_mask: Item$;

export const pixel_component_range_start: Item$;

export const pixel_component_range_stop: Item$;

export const pixel_component_physical_units: Item$;

export const pixel_component_data_type: Item$;

export const number_of_table_break_points: Item$;

export const table_of_x_break_points: Item$;

export const table_of_y_break_points: Item$;

export const number_of_table_entries: Item$;

export const table_of_pixel_values: Item$;

export const table_of_parameter_values: Item$;

export const r_wave_time_vector: Item$;

export const active_image_area_overlay_group: Item$;

export const detector_conditions_nominal_flag: Item$;

export const detector_temperature: Item$;

export const detector_type: Item$;

export const detector_configuration: Item$;

export const detector_description: Item$;

export const detector_mode: Item$;

export const detector_id: Item$;

export const date_of_last_detector_calibration: Item$;

export const time_of_last_detector_calibration: Item$;

export const exposures_on_detector_since_last_calibration: Item$;

export const exposures_on_detector_since_manufactured: Item$;

export const detector_time_since_last_exposure: Item$;

export const detector_active_time: Item$;

export const detector_activation_offset_from_exposure: Item$;

export const detector_binning: Item$;

export const detector_element_physical_size: Item$;

export const detector_element_spacing: Item$;

export const detector_active_shape: Item$;

export const detector_active_dimensions: Item$;

export const detector_active_origin: Item$;

export const detector_manufacturer_name: Item$;

export const detector_manufacturer_model_name: Item$;

export const field_of_view_origin: Item$;

export const field_of_view_rotation: Item$;

export const field_of_view_horizontal_flip: Item$;

export const pixel_data_area_origin_relative_to_fov: Item$;

export const pixel_data_area_rotation_angle_relative_to_fov: Item$;

export const grid_absorbing_material: Item$;

export const grid_spacing_material: Item$;

export const grid_thickness: Item$;

export const grid_pitch: Item$;

export const grid_aspect_ratio: Item$;

export const grid_period: Item$;

export const grid_focal_distance: Item$;

export const filter_material: Item$;

export const filter_thickness_minimum: Item$;

export const filter_thickness_maximum: Item$;

export const filter_beam_path_length_minimum: Item$;

export const filter_beam_path_length_maximum: Item$;

export const exposure_control_mode: Item$;

export const exposure_control_mode_description: Item$;

export const exposure_status: Item$;

export const phototimer_setting: Item$;

export const exposure_time_in_microseconds: Item$;

export const x_ray_tube_current_in_microamps: Item$;

export const content_qualification: Item$;

export const pulse_sequence_name: Item$;

export const mr_imaging_modifier_sequence: Item$;

export const echo_pulse_sequence: Item$;

export const inversion_recovery: Item$;

export const flow_compensation: Item$;

export const multiple_spin_echo: Item$;

export const multi_planar_excitation: Item$;

export const phase_contrast: Item$;

export const time_of_flight_contrast: Item$;

export const spoiling: Item$;

export const steady_state_pulse_sequence: Item$;

export const echo_planar_pulse_sequence: Item$;

export const tag_angle_first_axis: Item$;

export const magnetization_transfer: Item$;

export const t2_preparation: Item$;

export const blood_signal_nulling: Item$;

export const saturation_recovery: Item$;

export const spectrally_selected_suppression: Item$;

export const spectrally_selected_excitation: Item$;

export const spatial_presaturation: Item$;

export const tagging: Item$;

export const oversampling_phase: Item$;

export const tag_spacing_first_dimension: Item$;

export const geometry_of_k_space_traversal: Item$;

export const segmented_k_space_traversal: Item$;

export const rectilinear_phase_encode_reordering: Item$;

export const tag_thickness: Item$;

export const partial_fourier_direction: Item$;

export const cardiac_synchronization_technique: Item$;

export const receive_coil_manufacturer_name: Item$;

export const mr_receive_coil_sequence: Item$;

export const receive_coil_type: Item$;

export const quadrature_receive_coil: Item$;

export const multi_coil_definition_sequence: Item$;

export const multi_coil_configuration: Item$;

export const multi_coil_element_name: Item$;

export const multi_coil_element_used: Item$;

export const mr_transmit_coil_sequence: Item$;

export const transmit_coil_manufacturer_name: Item$;

export const transmit_coil_type: Item$;

export const spectral_width: Item$;

export const chemical_shift_reference: Item$;

export const volume_localization_technique: Item$;

export const mr_acquisition_frequency_encoding_steps: Item$;

export const decoupling: Item$;

export const decoupled_nucleus: Item$;

export const decoupling_frequency: Item$;

export const decoupling_method: Item$;

export const decoupling_chemical_shift_reference: Item$;

export const k_space_filtering: Item$;

export const time_domain_filtering: Item$;

export const number_of_zero_fills: Item$;

export const baseline_correction: Item$;

export const parallel_reduction_factor_in_plane: Item$;

export const cardiac_rr_interval_specified: Item$;

export const acquisition_duration: Item$;

export const frame_acquisition_date_time: Item$;

export const diffusion_directionality: Item$;

export const diffusion_gradient_direction_sequence: Item$;

export const parallel_acquisition: Item$;

export const parallel_acquisition_technique: Item$;

export const inversion_times: Item$;

export const metabolite_map_description: Item$;

export const partial_fourier: Item$;

export const effective_echo_time: Item$;

export const metabolite_map_code_sequence: Item$;

export const chemical_shift_sequence: Item$;

export const cardiac_signal_source: Item$;

export const diffusion_b_value: Item$;

export const diffusion_gradient_orientation: Item$;

export const velocity_encoding_direction: Item$;

export const velocity_encoding_minimum_value: Item$;

export const velocity_encoding_acquisition_sequence: Item$;

export const number_of_k_space_trajectories: Item$;

export const coverage_of_k_space: Item$;

export const spectroscopy_acquisition_phase_rows: Item$;

export const parallel_reduction_factor_in_plane_retired: Item$;

export const transmitter_frequency: Item$;

export const resonant_nucleus: Item$;

export const frequency_correction: Item$;

export const mr_spectroscopy_fov_geometry_sequence: Item$;

export const slab_thickness: Item$;

export const slab_orientation: Item$;

export const mid_slab_position: Item$;

export const mr_spatial_saturation_sequence: Item$;

export const mr_timing_and_related_parameters_sequence: Item$;

export const mr_echo_sequence: Item$;

export const mr_modifier_sequence: Item$;

export const mr_diffusion_sequence: Item$;

export const cardiac_synchronization_sequence: Item$;

export const mr_averages_sequence: Item$;

export const mr_fov_geometry_sequence: Item$;

export const volume_localization_sequence: Item$;

export const spectroscopy_acquisition_data_columns: Item$;

export const diffusion_anisotropy_type: Item$;

export const frame_reference_date_time: Item$;

export const mr_metabolite_map_sequence: Item$;

export const parallel_reduction_factor_out_of_plane: Item$;

export const spectroscopy_acquisition_out_of_plane_phase_steps: Item$;

export const bulk_motion_status: Item$;

export const parallel_reduction_factor_second_in_plane: Item$;

export const cardiac_beat_rejection_technique: Item$;

export const respiratory_motion_compensation_technique: Item$;

export const respiratory_signal_source: Item$;

export const bulk_motion_compensation_technique: Item$;

export const bulk_motion_signal_source: Item$;

export const applicable_safety_standard_agency: Item$;

export const applicable_safety_standard_description: Item$;

export const operating_mode_sequence: Item$;

export const operating_mode_type: Item$;

export const operating_mode: Item$;

export const specific_absorption_rate_definition: Item$;

export const gradient_output_type: Item$;

export const specific_absorption_rate_value: Item$;

export const gradient_output: Item$;

export const flow_compensation_direction: Item$;

export const tagging_delay: Item$;

export const respiratory_motion_compensation_technique_description: Item$;

export const respiratory_signal_source_id: Item$;

export const chemical_shift_minimum_integration_limit_in_hz: Item$;

export const chemical_shift_maximum_integration_limit_in_hz: Item$;

export const mr_velocity_encoding_sequence: Item$;

export const first_order_phase_correction: Item$;

export const water_referenced_phase_correction: Item$;

export const mr_spectroscopy_acquisition_type: Item$;

export const respiratory_cycle_position: Item$;

export const velocity_encoding_maximum_value: Item$;

export const tag_spacing_second_dimension: Item$;

export const tag_angle_second_axis: Item$;

export const frame_acquisition_duration: Item$;

export const mr_image_frame_type_sequence: Item$;

export const mr_spectroscopy_frame_type_sequence: Item$;

export const mr_acquisition_phase_encoding_steps_in_plane: Item$;

export const mr_acquisition_phase_encoding_steps_out_of_plane: Item$;

export const spectroscopy_acquisition_phase_columns: Item$;

export const cardiac_cycle_position: Item$;

export const specific_absorption_rate_sequence: Item$;

export const rf_echo_train_length: Item$;

export const gradient_echo_train_length: Item$;

export const arterial_spin_labeling_contrast: Item$;

export const mr_arterial_spin_labeling_sequence: Item$;

export const asl_technique_description: Item$;

export const asl_slab_number: Item$;

export const asl_slab_thickness: Item$;

export const asl_slab_orientation: Item$;

export const asl_mid_slab_position: Item$;

export const asl_context: Item$;

export const asl_pulse_train_duration: Item$;

export const asl_crusher_flag: Item$;

export const asl_crusher_flow_limit: Item$;

export const asl_crusher_description: Item$;

export const asl_bolus_cutoff_flag: Item$;

export const asl_bolus_cutoff_timing_sequence: Item$;

export const asl_bolus_cutoff_technique: Item$;

export const asl_bolus_cutoff_delay_time: Item$;

export const asl_slab_sequence: Item$;

export const chemical_shift_minimum_integration_limit_inppm: Item$;

export const chemical_shift_maximum_integration_limit_inppm: Item$;

export const water_reference_acquisition: Item$;

export const echo_peak_position: Item$;

export const ct_acquisition_type_sequence: Item$;

export const acquisition_type: Item$;

export const tube_angle: Item$;

export const ct_acquisition_details_sequence: Item$;

export const revolution_time: Item$;

export const single_collimation_width: Item$;

export const total_collimation_width: Item$;

export const ct_table_dynamics_sequence: Item$;

export const table_speed: Item$;

export const table_feed_per_rotation: Item$;

export const spiral_pitch_factor: Item$;

export const ct_geometry_sequence: Item$;

export const data_collection_center_patient: Item$;

export const ct_reconstruction_sequence: Item$;

export const reconstruction_algorithm: Item$;

export const convolution_kernel_group: Item$;

export const reconstruction_field_of_view: Item$;

export const reconstruction_target_center_patient: Item$;

export const reconstruction_angle: Item$;

export const image_filter: Item$;

export const ct_exposure_sequence: Item$;

export const reconstruction_pixel_spacing: Item$;

export const exposure_modulation_type: Item$;

export const estimated_dose_saving: Item$;

export const ct_x_ray_details_sequence: Item$;

export const ct_position_sequence: Item$;

export const table_position: Item$;

export const exposure_time_inms: Item$;

export const ct_image_frame_type_sequence: Item$;

export const x_ray_tube_current_in_milliamps: Item$;

export const exposure_inm_as: Item$;

export const constant_volume_flag: Item$;

export const fluoroscopy_flag: Item$;

export const distance_source_to_data_collection_center: Item$;

export const contrast_bolus_agent_number: Item$;

export const contrast_bolus_ingredient_code_sequence: Item$;

export const contrast_administration_profile_sequence: Item$;

export const contrast_bolus_usage_sequence: Item$;

export const contrast_bolus_agent_administered: Item$;

export const contrast_bolus_agent_detected: Item$;

export const contrast_bolus_agent_phase: Item$;

export const ctdi_vol: Item$;

export const ctdi_phantom_type_code_sequence: Item$;

export const calcium_scoring_mass_factor_patient: Item$;

export const calcium_scoring_mass_factor_device: Item$;

export const energy_weighting_factor: Item$;

export const ct_additional_x_ray_source_sequence: Item$;

export const multienergy_ct_acquisition: Item$;

export const multienergy_ct_acquisition_sequence: Item$;

export const multienergy_ct_processing_sequence: Item$;

export const multienergy_ct_characteristics_sequence: Item$;

export const multienergy_ct_x_ray_source_sequence: Item$;

export const x_ray_source_index: Item$;

export const x_ray_source_id: Item$;

export const multienergy_source_technique: Item$;

export const source_start_date_time: Item$;

export const source_end_date_time: Item$;

export const switching_phase_number: Item$;

export const switching_phase_nominal_duration: Item$;

export const switching_phase_transition_duration: Item$;

export const effective_bin_energy: Item$;

export const multienergy_ct_x_ray_detector_sequence: Item$;

export const x_ray_detector_index: Item$;

export const x_ray_detector_id: Item$;

export const multienergy_detector_type: Item$;

export const x_ray_detector_label: Item$;

export const nominal_max_energy: Item$;

export const nominal_min_energy: Item$;

export const referenced_x_ray_detector_index: Item$;

export const referenced_x_ray_source_index: Item$;

export const referenced_path_index: Item$;

export const multienergy_ct_path_sequence: Item$;

export const multienergy_ct_path_index: Item$;

export const multienergy_acquisition_description: Item$;

export const monoenergetic_energy_equivalent: Item$;

export const material_code_sequence: Item$;

export const decomposition_method: Item$;

export const decomposition_description: Item$;

export const decomposition_algorithm_identification_sequence: Item$;

export const decomposition_material_sequence: Item$;

export const material_attenuation_sequence: Item$;

export const photon_energy: Item$;

export const x_ray_mass_attenuation_coefficient: Item$;

export const projection_pixel_calibration_sequence: Item$;

export const distance_source_to_isocenter: Item$;

export const distance_object_to_table_top: Item$;

export const object_pixel_spacing_in_center_of_beam: Item$;

export const positioner_position_sequence: Item$;

export const table_position_sequence: Item$;

export const collimator_shape_sequence: Item$;

export const planes_in_acquisition: Item$;

export const xaxrf_frame_characteristics_sequence: Item$;

export const frame_acquisition_sequence: Item$;

export const x_ray_receptor_type: Item$;

export const acquisition_protocol_name: Item$;

export const acquisition_protocol_description: Item$;

export const contrast_bolus_ingredient_opaque: Item$;

export const distance_receptor_plane_to_detector_housing: Item$;

export const intensifier_active_shape: Item$;

export const intensifier_active_dimensions: Item$;

export const physical_detector_size: Item$;

export const position_of_isocenter_projection: Item$;

export const field_of_view_sequence: Item$;

export const field_of_view_description: Item$;

export const exposure_control_sensing_regions_sequence: Item$;

export const exposure_control_sensing_region_shape: Item$;

export const exposure_control_sensing_region_left_vertical_edge: Item$;

export const exposure_control_sensing_region_right_vertical_edge: Item$;

export const exposure_control_sensing_region_upper_horizontal_edge: Item$;

export const exposure_control_sensing_region_lower_horizontal_edge: Item$;

export const center_of_circular_exposure_control_sensing_region: Item$;

export const radius_of_circular_exposure_control_sensing_region: Item$;

export const vertices_of_the_polygonal_exposure_control_sensing_region: Item$;

export const column_angulation_patient: Item$;

export const beam_angle: Item$;

export const frame_detector_parameters_sequence: Item$;

export const calculated_anatomy_thickness: Item$;

export const calibration_sequence: Item$;

export const object_thickness_sequence: Item$;

export const plane_identification: Item$;

export const field_of_view_dimensions_in_float: Item$;

export const isocenter_reference_system_sequence: Item$;

export const positioner_isocenter_primary_angle: Item$;

export const positioner_isocenter_secondary_angle: Item$;

export const positioner_isocenter_detector_rotation_angle: Item$;

export const table_x_position_to_isocenter: Item$;

export const table_y_position_to_isocenter: Item$;

export const table_z_position_to_isocenter: Item$;

export const table_horizontal_rotation_angle: Item$;

export const table_head_tilt_angle: Item$;

export const table_cradle_tilt_angle: Item$;

export const frame_display_shutter_sequence: Item$;

export const acquired_image_area_dose_product: Item$;

export const c_arm_positioner_tabletop_relationship: Item$;

export const x_ray_geometry_sequence: Item$;

export const irradiation_event_identification_sequence: Item$;

export const x_ray_3d_frame_type_sequence: Item$;

export const contributing_sources_sequence: Item$;

export const x_ray_3d_acquisition_sequence: Item$;

export const primary_positioner_scan_arc: Item$;

export const secondary_positioner_scan_arc: Item$;

export const primary_positioner_scan_start_angle: Item$;

export const secondary_positioner_scan_start_angle: Item$;

export const primary_positioner_increment: Item$;

export const secondary_positioner_increment: Item$;

export const start_acquisition_date_time: Item$;

export const end_acquisition_date_time: Item$;

export const primary_positioner_increment_sign: Item$;

export const secondary_positioner_increment_sign: Item$;

export const application_name: Item$;

export const application_version: Item$;

export const application_manufacturer: Item$;

export const algorithm_type: Item$;

export const algorithm_description: Item$;

export const x_ray_3d_reconstruction_sequence: Item$;

export const reconstruction_description: Item$;

export const per_projection_acquisition_sequence: Item$;

export const detector_position_sequence: Item$;

export const x_ray_acquisition_dose_sequence: Item$;

export const x_ray_source_isocenter_primary_angle: Item$;

export const x_ray_source_isocenter_secondary_angle: Item$;

export const breast_support_isocenter_primary_angle: Item$;

export const breast_support_isocenter_secondary_angle: Item$;

export const breast_support_x_position_to_isocenter: Item$;

export const breast_support_y_position_to_isocenter: Item$;

export const breast_support_z_position_to_isocenter: Item$;

export const detector_isocenter_primary_angle: Item$;

export const detector_isocenter_secondary_angle: Item$;

export const detector_x_position_to_isocenter: Item$;

export const detector_y_position_to_isocenter: Item$;

export const detector_z_position_to_isocenter: Item$;

export const x_ray_grid_sequence: Item$;

export const x_ray_filter_sequence: Item$;

export const detector_active_area_tlhc_position: Item$;

export const detector_active_area_orientation: Item$;

export const positioner_primary_angle_direction: Item$;

export const diffusion_b_matrix_sequence: Item$;

export const diffusion_b_value_xx: Item$;

export const diffusion_b_value_xy: Item$;

export const diffusion_b_value_xz: Item$;

export const diffusion_b_value_yy: Item$;

export const diffusion_b_value_yz: Item$;

export const diffusion_b_value_zz: Item$;

export const functional_mr_sequence: Item$;

export const functional_settling_phase_frames_present: Item$;

export const functional_sync_pulse: Item$;

export const settling_phase_frame: Item$;

export const decay_correction_date_time: Item$;

export const start_density_threshold: Item$;

export const start_relative_density_difference_threshold: Item$;

export const start_cardiac_trigger_count_threshold: Item$;

export const start_respiratory_trigger_count_threshold: Item$;

export const termination_counts_threshold: Item$;

export const termination_density_threshold: Item$;

export const termination_relative_density_threshold: Item$;

export const termination_time_threshold: Item$;

export const termination_cardiac_trigger_count_threshold: Item$;

export const termination_respiratory_trigger_count_threshold: Item$;

export const detector_geometry: Item$;

export const transverse_detector_separation: Item$;

export const axial_detector_dimension: Item$;

export const radiopharmaceutical_agent_number: Item$;

export const pet_frame_acquisition_sequence: Item$;

export const pet_detector_motion_details_sequence: Item$;

export const pet_table_dynamics_sequence: Item$;

export const pet_position_sequence: Item$;

export const pet_frame_correction_factors_sequence: Item$;

export const radiopharmaceutical_usage_sequence: Item$;

export const attenuation_correction_source: Item$;

export const number_of_iterations: Item$;

export const number_of_subsets: Item$;

export const pet_reconstruction_sequence: Item$;

export const pet_frame_type_sequence: Item$;

export const time_of_flight_information_used: Item$;

export const reconstruction_type: Item$;

export const decay_corrected: Item$;

export const attenuation_corrected: Item$;

export const scatter_corrected: Item$;

export const dead_time_corrected: Item$;

export const gantry_motion_corrected: Item$;

export const patient_motion_corrected: Item$;

export const count_loss_normalization_corrected: Item$;

export const randoms_corrected: Item$;

export const non_uniform_radial_sampling_corrected: Item$;

export const sensitivity_calibrated: Item$;

export const detector_normalization_correction: Item$;

export const iterative_reconstruction_method: Item$;

export const attenuation_correction_temporal_relationship: Item$;

export const patient_physiological_state_sequence: Item$;

export const patient_physiological_state_code_sequence: Item$;

export const depths_of_focus: Item$;

export const excluded_intervals_sequence: Item$;

export const exclusion_start_date_time: Item$;

export const exclusion_duration: Item$;

export const us_image_description_sequence: Item$;

export const image_data_type_sequence: Item$;

export const data_type: Item$;

export const transducer_scan_pattern_code_sequence: Item$;

export const aliased_data_type: Item$;

export const position_measuring_device_used: Item$;

export const transducer_geometry_code_sequence: Item$;

export const transducer_beam_steering_code_sequence: Item$;

export const transducer_application_code_sequence: Item$;

export const zero_velocity_pixel_value: Item$;

export const photoacoustic_excitation_characteristics_sequence: Item$;

export const excitation_spectral_width: Item$;

export const excitation_energy: Item$;

export const excitation_pulse_duration: Item$;

export const excitation_wavelength_sequence: Item$;

export const excitation_wavelength: Item$;

export const illumination_translation_flag: Item$;

export const acoustic_coupling_medium_flag: Item$;

export const acoustic_coupling_medium_code_sequence: Item$;

export const acoustic_coupling_medium_temperature: Item$;

export const transducer_response_sequence: Item$;

export const center_frequency: Item$;

export const fractional_bandwidth: Item$;

export const lower_cutoff_frequency: Item$;

export const upper_cutoff_frequency: Item$;

export const transducer_technology_sequence: Item$;

export const sound_speed_correction_mechanism_code_sequence: Item$;

export const object_sound_speed: Item$;

export const acoustic_coupling_medium_sound_speed: Item$;

export const photoacoustic_image_frame_type_sequence: Item$;

export const image_data_type_code_sequence: Item$;

export const reference_location_label: Item$;

export const reference_location_description: Item$;

export const reference_basis_code_sequence: Item$;

export const reference_geometry_code_sequence: Item$;

export const offset_distance: Item$;

export const offset_direction: Item$;

export const potential_scheduled_protocol_code_sequence: Item$;

export const potential_requested_procedure_code_sequence: Item$;

export const potential_reasons_for_procedure: Item$;

export const potential_reasons_for_procedure_code_sequence: Item$;

export const potential_diagnostic_tasks: Item$;

export const contraindications_code_sequence: Item$;

export const referenced_defined_protocol_sequence: Item$;

export const referenced_performed_protocol_sequence: Item$;

export const predecessor_protocol_sequence: Item$;

export const protocol_planning_information: Item$;

export const protocol_design_rationale: Item$;

export const patient_specification_sequence: Item$;

export const model_specification_sequence: Item$;

export const parameters_specification_sequence: Item$;

export const instruction_sequence: Item$;

export const instruction_index: Item$;

export const instruction_text: Item$;

export const instruction_description: Item$;

export const instruction_performed_flag: Item$;

export const instruction_performed_date_time: Item$;

export const instruction_performance_comment: Item$;

export const patient_positioning_instruction_sequence: Item$;

export const positioning_method_code_sequence: Item$;

export const positioning_landmark_sequence: Item$;

export const target_frame_of_reference_uid: Item$;

export const acquisition_protocol_element_specification_sequence: Item$;

export const acquisition_protocol_element_sequence: Item$;

export const protocol_element_number: Item$;

export const protocol_element_name: Item$;

export const protocol_element_characteristics_summary: Item$;

export const protocol_element_purpose: Item$;

export const acquisition_motion: Item$;

export const acquisition_start_location_sequence: Item$;

export const acquisition_end_location_sequence: Item$;

export const reconstruction_protocol_element_specification_sequence: Item$;

export const reconstruction_protocol_element_sequence: Item$;

export const storage_protocol_element_specification_sequence: Item$;

export const storage_protocol_element_sequence: Item$;

export const requested_series_description: Item$;

export const source_acquisition_protocol_element_number: Item$;

export const source_acquisition_beam_number: Item$;

export const source_reconstruction_protocol_element_number: Item$;

export const reconstruction_start_location_sequence: Item$;

export const reconstruction_end_location_sequence: Item$;

export const reconstruction_algorithm_sequence: Item$;

export const reconstruction_target_center_location_sequence: Item$;

export const image_filter_description: Item$;

export const ctdi_vol_notification_trigger: Item$;

export const dlp_notification_trigger: Item$;

export const auto_kvp_selection_type: Item$;

export const auto_kvp_upper_bound: Item$;

export const auto_kvp_lower_bound: Item$;

export const protocol_defined_patient_position: Item$;

export const contributing_equipment_sequence: Item$;

export const contribution_date_time: Item$;

export const contribution_description: Item$;

export const study_instance_uid: Item$;

export const series_instance_uid: Item$;

export const study_id: Item$;

export const series_number: Item$;

export const acquisition_number: Item$;

export const instance_number: Item$;

export const isotope_number: Item$;

export const phase_number: Item$;

export const interval_number: Item$;

export const time_slot_number: Item$;

export const angle_number: Item$;

export const item_number: Item$;

export const patient_orientation: Item$;

export const overlay_number: Item$;

export const curve_number: Item$;

export const lut_number: Item$;

export const pyramid_label: Item$;

export const image_position: Item$;

export const image_position_patient: Item$;

export const image_orientation: Item$;

export const image_orientation_patient: Item$;

export const location: Item$;

export const frame_of_reference_uid: Item$;

export const laterality: Item$;

export const image_laterality: Item$;

export const image_geometry_type: Item$;

export const masking_image: Item$;

export const report_number: Item$;

export const temporal_position_identifier: Item$;

export const number_of_temporal_positions: Item$;

export const temporal_resolution: Item$;

export const synchronization_frame_of_reference_uid: Item$;

export const sop_instance_uid_of_concatenation_source: Item$;

export const series_in_study: Item$;

export const acquisitions_in_series: Item$;

export const images_in_acquisition: Item$;

export const images_in_series: Item$;

export const acquisitions_in_study: Item$;

export const images_in_study: Item$;

export const reference: Item$;

export const target_position_reference_indicator: Item$;

export const position_reference_indicator: Item$;

export const slice_location: Item$;

export const other_study_numbers: Item$;

export const number_of_patient_related_studies: Item$;

export const number_of_patient_related_series: Item$;

export const number_of_patient_related_instances: Item$;

export const number_of_study_related_series: Item$;

export const number_of_study_related_instances: Item$;

export const number_of_series_related_instances: Item$;

export const source_image_ids: Item$;

export const modifying_device_id: Item$;

export const modified_image_id: Item$;

export const modified_image_date: Item$;

export const modifying_device_manufacturer: Item$;

export const modified_image_time: Item$;

export const modified_image_description: Item$;

export const image_comments: Item$;

export const original_image_identification: Item$;

export const original_image_identification_nomenclature: Item$;

export const stack_id: Item$;

export const in_stack_position_number: Item$;

export const frame_anatomy_sequence: Item$;

export const frame_laterality: Item$;

export const frame_content_sequence: Item$;

export const plane_position_sequence: Item$;

export const plane_orientation_sequence: Item$;

export const temporal_position_index: Item$;

export const nominal_cardiac_trigger_delay_time: Item$;

export const nominal_cardiac_trigger_time_prior_to_r_peak: Item$;

export const actual_cardiac_trigger_time_prior_to_r_peak: Item$;

export const frame_acquisition_number: Item$;

export const dimension_index_values: Item$;

export const frame_comments: Item$;

export const concatenation_uid: Item$;

export const in_concatenation_number: Item$;

export const in_concatenation_total_number: Item$;

export const dimension_organization_uid: Item$;

export const dimension_index_pointer: Item$;

export const functional_group_pointer: Item$;

export const unassigned_shared_converted_attributes_sequence: Item$;

export const unassigned_per_frame_converted_attributes_sequence: Item$;

export const conversion_source_attributes_sequence: Item$;

export const dimension_index_private_creator: Item$;

export const dimension_organization_sequence: Item$;

export const dimension_index_sequence: Item$;

export const concatenation_frame_offset_number: Item$;

export const functional_group_private_creator: Item$;

export const nominal_percentage_of_cardiac_phase: Item$;

export const nominal_percentage_of_respiratory_phase: Item$;

export const starting_respiratory_amplitude: Item$;

export const starting_respiratory_phase: Item$;

export const ending_respiratory_amplitude: Item$;

export const ending_respiratory_phase: Item$;

export const respiratory_trigger_type: Item$;

export const rr_interval_time_nominal: Item$;

export const actual_cardiac_trigger_delay_time: Item$;

export const respiratory_synchronization_sequence: Item$;

export const respiratory_interval_time: Item$;

export const nominal_respiratory_trigger_delay_time: Item$;

export const respiratory_trigger_delay_threshold: Item$;

export const actual_respiratory_trigger_delay_time: Item$;

export const image_position_volume: Item$;

export const image_orientation_volume: Item$;

export const ultrasound_acquisition_geometry: Item$;

export const apex_position: Item$;

export const volume_to_transducer_mapping_matrix: Item$;

export const volume_to_table_mapping_matrix: Item$;

export const volume_to_transducer_relationship: Item$;

export const patient_frame_of_reference_source: Item$;

export const temporal_position_time_offset: Item$;

export const plane_position_volume_sequence: Item$;

export const plane_orientation_volume_sequence: Item$;

export const temporal_position_sequence: Item$;

export const dimension_organization_type: Item$;

export const volume_frame_of_reference_uid: Item$;

export const table_frame_of_reference_uid: Item$;

export const dimension_description_label: Item$;

export const patient_orientation_in_frame_sequence: Item$;

export const frame_label: Item$;

export const acquisition_index: Item$;

export const contributing_sop_instances_reference_sequence: Item$;

export const reconstruction_index: Item$;

export const light_path_filter_pass_through_wavelength: Item$;

export const light_path_filter_pass_band: Item$;

export const image_path_filter_pass_through_wavelength: Item$;

export const image_path_filter_pass_band: Item$;

export const patient_eye_movement_commanded: Item$;

export const patient_eye_movement_command_code_sequence: Item$;

export const spherical_lens_power: Item$;

export const cylinder_lens_power: Item$;

export const cylinder_axis: Item$;

export const emmetropic_magnification: Item$;

export const intra_ocular_pressure: Item$;

export const horizontal_field_of_view: Item$;

export const pupil_dilated: Item$;

export const degree_of_dilation: Item$;

export const vertex_distance: Item$;

export const stereo_baseline_angle: Item$;

export const stereo_baseline_displacement: Item$;

export const stereo_horizontal_pixel_offset: Item$;

export const stereo_vertical_pixel_offset: Item$;

export const stereo_rotation: Item$;

export const acquisition_device_type_code_sequence: Item$;

export const illumination_type_code_sequence: Item$;

export const light_path_filter_type_stack_code_sequence: Item$;

export const image_path_filter_type_stack_code_sequence: Item$;

export const lenses_code_sequence: Item$;

export const channel_description_code_sequence: Item$;

export const refractive_state_sequence: Item$;

export const mydriatic_agent_code_sequence: Item$;

export const relative_image_position_code_sequence: Item$;

export const camera_angle_of_view: Item$;

export const stereo_pairs_sequence: Item$;

export const left_image_sequence: Item$;

export const right_image_sequence: Item$;

export const stereo_pairs_present: Item$;

export const axial_length_of_the_eye: Item$;

export const ophthalmic_frame_location_sequence: Item$;

export const reference_coordinates: Item$;

export const depth_spatial_resolution: Item$;

export const maximum_depth_distortion: Item$;

export const along_scan_spatial_resolution: Item$;

export const maximum_along_scan_distortion: Item$;

export const ophthalmic_image_orientation: Item$;

export const depth_of_transverse_image: Item$;

export const mydriatic_agent_concentration_units_sequence: Item$;

export const across_scan_spatial_resolution: Item$;

export const maximum_across_scan_distortion: Item$;

export const mydriatic_agent_concentration: Item$;

export const illumination_wave_length: Item$;

export const illumination_power: Item$;

export const illumination_bandwidth: Item$;

export const mydriatic_agent_sequence: Item$;

export const ophthalmic_axial_measurements_right_eye_sequence: Item$;

export const ophthalmic_axial_measurements_left_eye_sequence: Item$;

export const ophthalmic_axial_measurements_device_type: Item$;

export const ophthalmic_axial_length_measurements_type: Item$;

export const ophthalmic_axial_length_sequence: Item$;

export const ophthalmic_axial_length: Item$;

export const lens_status_code_sequence: Item$;

export const vitreous_status_code_sequence: Item$;

export const iol_formula_code_sequence: Item$;

export const iol_formula_detail: Item$;

export const keratometer_index: Item$;

export const source_of_ophthalmic_axial_length_code_sequence: Item$;

export const source_of_corneal_size_data_code_sequence: Item$;

export const target_refraction: Item$;

export const refractive_procedure_occurred: Item$;

export const refractive_surgery_type_code_sequence: Item$;

export const ophthalmic_ultrasound_method_code_sequence: Item$;

export const surgically_induced_astigmatism_sequence: Item$;

export const type_of_optical_correction: Item$;

export const toric_iol_power_sequence: Item$;

export const predicted_toric_error_sequence: Item$;

export const pre_selected_for_implantation: Item$;

export const toric_iol_power_for_exact_emmetropia_sequence: Item$;

export const toric_iol_power_for_exact_target_refraction_sequence: Item$;

export const ophthalmic_axial_length_measurements_sequence: Item$;

export const iol_power: Item$;

export const predicted_refractive_error: Item$;

export const ophthalmic_axial_length_velocity: Item$;

export const lens_status_description: Item$;

export const vitreous_status_description: Item$;

export const iol_power_sequence: Item$;

export const lens_constant_sequence: Item$;

export const iol_manufacturer: Item$;

export const lens_constant_description: Item$;

export const implant_name: Item$;

export const keratometry_measurement_type_code_sequence: Item$;

export const implant_part_number: Item$;

export const referenced_ophthalmic_axial_measurements_sequence: Item$;

export const ophthalmic_axial_length_measurements_segment_name_code_sequence: Item$;

export const refractive_error_before_refractive_surgery_code_sequence: Item$;

export const iol_power_for_exact_emmetropia: Item$;

export const iol_power_for_exact_target_refraction: Item$;

export const anterior_chamber_depth_definition_code_sequence: Item$;

export const lens_thickness_sequence: Item$;

export const anterior_chamber_depth_sequence: Item$;

export const calculation_comment_sequence: Item$;

export const calculation_comment_type: Item$;

export const calculation_comment: Item$;

export const lens_thickness: Item$;

export const anterior_chamber_depth: Item$;

export const source_of_lens_thickness_data_code_sequence: Item$;

export const source_of_anterior_chamber_depth_data_code_sequence: Item$;

export const source_of_refractive_measurements_sequence: Item$;

export const source_of_refractive_measurements_code_sequence: Item$;

export const ophthalmic_axial_length_measurement_modified: Item$;

export const ophthalmic_axial_length_data_source_code_sequence: Item$;

export const ophthalmic_axial_length_acquisition_method_code_sequence: Item$;

export const signal_to_noise_ratio: Item$;

export const ophthalmic_axial_length_data_source_description: Item$;

export const ophthalmic_axial_length_measurements_total_length_sequence: Item$;

export const ophthalmic_axial_length_measurements_segmental_length_sequence: Item$;

export const ophthalmic_axial_length_measurements_length_summation_sequence: Item$;

export const ultrasound_ophthalmic_axial_length_measurements_sequence: Item$;

export const optical_ophthalmic_axial_length_measurements_sequence: Item$;

export const ultrasound_selected_ophthalmic_axial_length_sequence: Item$;

export const ophthalmic_axial_length_selection_method_code_sequence: Item$;

export const optical_selected_ophthalmic_axial_length_sequence: Item$;

export const selected_segmental_ophthalmic_axial_length_sequence: Item$;

export const selected_total_ophthalmic_axial_length_sequence: Item$;

export const ophthalmic_axial_length_quality_metric_sequence: Item$;

export const ophthalmic_axial_length_quality_metric_type_code_sequence: Item$;

export const ophthalmic_axial_length_quality_metric_type_description: Item$;

export const intraocular_lens_calculations_right_eye_sequence: Item$;

export const intraocular_lens_calculations_left_eye_sequence: Item$;

export const referenced_ophthalmic_axial_length_measurement_qc_image_sequence: Item$;

export const ophthalmic_mapping_device_type: Item$;

export const acquisition_method_code_sequence: Item$;

export const acquisition_method_algorithm_sequence: Item$;

export const ophthalmic_thickness_map_type_code_sequence: Item$;

export const ophthalmic_thickness_mapping_normals_sequence: Item$;

export const retinal_thickness_definition_code_sequence: Item$;

export const pixel_value_mapping_to_coded_concept_sequence: Item$;

export const mapped_pixel_value: Item$;

export const pixel_value_mapping_explanation: Item$;

export const ophthalmic_thickness_map_quality_threshold_sequence: Item$;

export const ophthalmic_thickness_map_threshold_quality_rating: Item$;

export const anatomic_structure_reference_point: Item$;

export const registration_to_localizer_sequence: Item$;

export const registered_localizer_units: Item$;

export const registered_localizer_top_left_hand_corner: Item$;

export const registered_localizer_bottom_right_hand_corner: Item$;

export const ophthalmic_thickness_map_quality_rating_sequence: Item$;

export const relevant_opt_attributes_sequence: Item$;

export const transformation_method_code_sequence: Item$;

export const transformation_algorithm_sequence: Item$;

export const ophthalmic_axial_length_method: Item$;

export const ophthalmic_fov: Item$;

export const two_dimensional_to_three_dimensional_map_sequence: Item$;

export const wide_field_ophthalmic_photography_quality_rating_sequence: Item$;

export const wide_field_ophthalmic_photography_quality_threshold_sequence: Item$;

export const wide_field_ophthalmic_photography_threshold_quality_rating: Item$;

export const x_coordinates_center_pixel_view_angle: Item$;

export const y_coordinates_center_pixel_view_angle: Item$;

export const number_of_map_points: Item$;

export const two_dimensional_to_three_dimensional_map_data: Item$;

export const derivation_algorithm_sequence: Item$;

export const ophthalmic_image_type_code_sequence: Item$;

export const ophthalmic_image_type_description: Item$;

export const scan_pattern_type_code_sequence: Item$;

export const referenced_surface_mesh_identification_sequence: Item$;

export const ophthalmic_volumetric_properties_flag: Item$;

export const ophthalmic_anatomic_reference_point_x_coordinate: Item$;

export const ophthalmic_anatomic_reference_point_y_coordinate: Item$;

export const ophthalmic_en_face_image_quality_rating_sequence: Item$;

export const quality_threshold: Item$;

export const oct_bscan_analysis_acquisition_parameters_sequence: Item$;

export const number_of_bscans_per_frame: Item$;

export const bscan_slab_thickness: Item$;

export const distance_between_bscan_slabs: Item$;

export const bscan_cycle_time: Item$;

export const bscan_cycle_time_vector: Item$;

export const ascan_rate: Item$;

export const bscan_rate: Item$;

export const surface_mesh_z_pixel_offset: Item$;

export const visual_field_horizontal_extent: Item$;

export const visual_field_vertical_extent: Item$;

export const visual_field_shape: Item$;

export const screening_test_mode_code_sequence: Item$;

export const maximum_stimulus_luminance: Item$;

export const background_luminance: Item$;

export const stimulus_color_code_sequence: Item$;

export const background_illumination_color_code_sequence: Item$;

export const stimulus_area: Item$;

export const stimulus_presentation_time: Item$;

export const fixation_sequence: Item$;

export const fixation_monitoring_code_sequence: Item$;

export const visual_field_catch_trial_sequence: Item$;

export const fixation_checked_quantity: Item$;

export const patient_not_properly_fixated_quantity: Item$;

export const presented_visual_stimuli_data_flag: Item$;

export const number_of_visual_stimuli: Item$;

export const excessive_fixation_losses_data_flag: Item$;

export const excessive_fixation_losses: Item$;

export const stimuli_retesting_quantity: Item$;

export const comments_on_patient_performance_of_visual_field: Item$;

export const false_negatives_estimate_flag: Item$;

export const false_negatives_estimate: Item$;

export const negative_catch_trials_quantity: Item$;

export const false_negatives_quantity: Item$;

export const excessive_false_negatives_data_flag: Item$;

export const excessive_false_negatives: Item$;

export const false_positives_estimate_flag: Item$;

export const false_positives_estimate: Item$;

export const catch_trials_data_flag: Item$;

export const positive_catch_trials_quantity: Item$;

export const test_point_normals_data_flag: Item$;

export const test_point_normals_sequence: Item$;

export const global_deviation_probability_normals_flag: Item$;

export const false_positives_quantity: Item$;

export const excessive_false_positives_data_flag: Item$;

export const excessive_false_positives: Item$;

export const visual_field_test_normals_flag: Item$;

export const results_normals_sequence: Item$;

export const age_corrected_sensitivity_deviation_algorithm_sequence: Item$;

export const global_deviation_from_normal: Item$;

export const generalized_defect_sensitivity_deviation_algorithm_sequence: Item$;

export const localized_deviation_from_normal: Item$;

export const patient_reliability_indicator: Item$;

export const visual_field_mean_sensitivity: Item$;

export const global_deviation_probability: Item$;

export const local_deviation_probability_normals_flag: Item$;

export const localized_deviation_probability: Item$;

export const short_term_fluctuation_calculated: Item$;

export const short_term_fluctuation: Item$;

export const short_term_fluctuation_probability_calculated: Item$;

export const short_term_fluctuation_probability: Item$;

export const corrected_localized_deviation_from_normal_calculated: Item$;

export const corrected_localized_deviation_from_normal: Item$;

export const corrected_localized_deviation_from_normal_probability_calculated: Item$;

export const corrected_localized_deviation_from_normal_probability: Item$;

export const global_deviation_probability_sequence: Item$;

export const localized_deviation_probability_sequence: Item$;

export const foveal_sensitivity_measured: Item$;

export const foveal_sensitivity: Item$;

export const visual_field_test_duration: Item$;

export const visual_field_test_point_sequence: Item$;

export const visual_field_test_point_x_coordinate: Item$;

export const visual_field_test_point_y_coordinate: Item$;

export const age_corrected_sensitivity_deviation_value: Item$;

export const stimulus_results: Item$;

export const sensitivity_value: Item$;

export const retest_stimulus_seen: Item$;

export const retest_sensitivity_value: Item$;

export const visual_field_test_point_normals_sequence: Item$;

export const quantified_defect: Item$;

export const age_corrected_sensitivity_deviation_probability_value: Item$;

export const generalized_defect_corrected_sensitivity_deviation_flag: Item$;

export const generalized_defect_corrected_sensitivity_deviation_value: Item$;

export const generalized_defect_corrected_sensitivity_deviation_probability_value: Item$;

export const minimum_sensitivity_value: Item$;

export const blind_spot_localized: Item$;

export const blind_spot_x_coordinate: Item$;

export const blind_spot_y_coordinate: Item$;

export const visual_acuity_measurement_sequence: Item$;

export const refractive_parameters_used_on_patient_sequence: Item$;

export const measurement_laterality: Item$;

export const ophthalmic_patient_clinical_information_left_eye_sequence: Item$;

export const ophthalmic_patient_clinical_information_right_eye_sequence: Item$;

export const foveal_point_normative_data_flag: Item$;

export const foveal_point_probability_value: Item$;

export const screening_baseline_measured: Item$;

export const screening_baseline_measured_sequence: Item$;

export const screening_baseline_type: Item$;

export const screening_baseline_value: Item$;

export const algorithm_source: Item$;

export const data_set_name: Item$;

export const data_set_version: Item$;

export const data_set_source: Item$;

export const data_set_description: Item$;

export const visual_field_test_reliability_global_index_sequence: Item$;

export const visual_field_global_results_index_sequence: Item$;

export const data_observation_sequence: Item$;

export const index_normals_flag: Item$;

export const index_probability: Item$;

export const index_probability_sequence: Item$;

export const samples_per_pixel: Item$;

export const samples_per_pixel_used: Item$;

export const photometric_interpretation: Item$;

export const image_dimensions: Item$;

export const planar_configuration: Item$;

export const number_of_frames: Item$;

export const frame_increment_pointer: Item$;

export const frame_dimension_pointer: Item$;

export const rows: Item$;

export const columns: Item$;

export const planes: Item$;

export const ultrasound_color_data_present: Item$;

export const pixel_spacing: Item$;

export const zoom_factor: Item$;

export const zoom_center: Item$;

export const pixel_aspect_ratio: Item$;

export const image_format: Item$;

export const manipulated_image: Item$;

export const corrected_image: Item$;

export const compression_recognition_code: Item$;

export const compression_code: Item$;

export const compression_originator: Item$;

export const compression_label: Item$;

export const compression_description: Item$;

export const compression_sequence: Item$;

export const compression_step_pointers: Item$;

export const repeat_interval: Item$;

export const bits_grouped: Item$;

export const perimeter_table: Item$;

export const perimeter_value: Item$;

export const predictor_rows: Item$;

export const predictor_columns: Item$;

export const predictor_constants: Item$;

export const blocked_pixels: Item$;

export const block_rows: Item$;

export const block_columns: Item$;

export const row_overlap: Item$;

export const column_overlap: Item$;

export const bits_allocated: Item$;

export const bits_stored: Item$;

export const high_bit: Item$;

export const pixel_representation: Item$;

export const smallest_valid_pixel_value: Item$;

export const largest_valid_pixel_value: Item$;

export const smallest_image_pixel_value: Item$;

export const largest_image_pixel_value: Item$;

export const smallest_pixel_value_in_series: Item$;

export const largest_pixel_value_in_series: Item$;

export const smallest_image_pixel_value_in_plane: Item$;

export const largest_image_pixel_value_in_plane: Item$;

export const pixel_padding_value: Item$;

export const pixel_padding_range_limit: Item$;

export const float_pixel_padding_value: Item$;

export const double_float_pixel_padding_value: Item$;

export const float_pixel_padding_range_limit: Item$;

export const double_float_pixel_padding_range_limit: Item$;

export const image_location: Item$;

export const quality_control_image: Item$;

export const burned_in_annotation: Item$;

export const recognizable_visual_features: Item$;

export const longitudinal_temporal_information_modified: Item$;

export const referenced_color_palette_instance_uid: Item$;

export const transform_label: Item$;

export const transform_version_number: Item$;

export const number_of_transform_steps: Item$;

export const sequence_of_compressed_data: Item$;

export const details_of_coefficients: Item$;

export const rows_for_nth_order_coefficients: Item$;

export const columns_for_nth_order_coefficients: Item$;

export const coefficient_coding: Item$;

export const coefficient_coding_pointers: Item$;

export const dct_label: Item$;

export const data_block_description: Item$;

export const data_block: Item$;

export const normalization_factor_format: Item$;

export const zonal_map_number_format: Item$;

export const zonal_map_location: Item$;

export const zonal_map_format: Item$;

export const adaptive_map_format: Item$;

export const code_number_format: Item$;

export const code_label: Item$;

export const number_of_tables: Item$;

export const code_table_location: Item$;

export const bits_for_code_word: Item$;

export const image_data_location: Item$;

export const pixel_spacing_calibration_type: Item$;

export const pixel_spacing_calibration_description: Item$;

export const pixel_intensity_relationship: Item$;

export const pixel_intensity_relationship_sign: Item$;

export const window_center: Item$;

export const window_width: Item$;

export const rescale_intercept: Item$;

export const rescale_slope: Item$;

export const rescale_type: Item$;

export const window_center_width_explanation: Item$;

export const voilut_function: Item$;

export const gray_scale: Item$;

export const recommended_viewing_mode: Item$;

export const gray_lookup_table_descriptor: Item$;

export const red_palette_color_lookup_table_descriptor: Item$;

export const green_palette_color_lookup_table_descriptor: Item$;

export const blue_palette_color_lookup_table_descriptor: Item$;

export const alpha_palette_color_lookup_table_descriptor: Item$;

export const large_red_palette_color_lookup_table_descriptor: Item$;

export const large_green_palette_color_lookup_table_descriptor: Item$;

export const large_blue_palette_color_lookup_table_descriptor: Item$;

export const palette_color_lookup_table_uid: Item$;

export const gray_lookup_table_data: Item$;

export const red_palette_color_lookup_table_data: Item$;

export const green_palette_color_lookup_table_data: Item$;

export const blue_palette_color_lookup_table_data: Item$;

export const alpha_palette_color_lookup_table_data: Item$;

export const large_red_palette_color_lookup_table_data: Item$;

export const large_green_palette_color_lookup_table_data: Item$;

export const large_blue_palette_color_lookup_table_data: Item$;

export const large_palette_color_lookup_table_uid: Item$;

export const segmented_red_palette_color_lookup_table_data: Item$;

export const segmented_green_palette_color_lookup_table_data: Item$;

export const segmented_blue_palette_color_lookup_table_data: Item$;

export const segmented_alpha_palette_color_lookup_table_data: Item$;

export const stored_value_color_range_sequence: Item$;

export const minimum_stored_value_mapped: Item$;

export const maximum_stored_value_mapped: Item$;

export const breast_implant_present: Item$;

export const partial_view: Item$;

export const partial_view_description: Item$;

export const partial_view_code_sequence: Item$;

export const spatial_locations_preserved: Item$;

export const data_frame_assignment_sequence: Item$;

export const data_path_assignment: Item$;

export const bits_mapped_to_color_lookup_table: Item$;

export const blending_lut1_sequence: Item$;

export const blending_lut1_transfer_function: Item$;

export const blending_weight_constant: Item$;

export const blending_lookup_table_descriptor: Item$;

export const blending_lookup_table_data: Item$;

export const enhanced_palette_color_lookup_table_sequence: Item$;

export const blending_lut2_sequence: Item$;

export const blending_lut2_transfer_function: Item$;

export const data_path_id: Item$;

export const rgblut_transfer_function: Item$;

export const alpha_lut_transfer_function: Item$;

export const icc_profile: Item$;

export const color_space: Item$;

export const lossy_image_compression: Item$;

export const lossy_image_compression_ratio: Item$;

export const lossy_image_compression_method: Item$;

export const modality_lut_sequence: Item$;

export const variable_modality_lut_sequence: Item$;

export const lut_descriptor: Item$;

export function is_lut_descriptor_tag(tag: $data_element_tag.DataElementTag$): boolean;

export const lut_explanation: Item$;

export const modality_lut_type: Item$;

export const lut_data: Item$;

export const voilut_sequence: Item$;

export const softcopy_voilut_sequence: Item$;

export const image_presentation_comments: Item$;

export const bi_plane_acquisition_sequence: Item$;

export const representative_frame_number: Item$;

export const frame_numbers_of_interest: Item$;

export const frame_of_interest_description: Item$;

export const frame_of_interest_type: Item$;

export const mask_pointers: Item$;

export const r_wave_pointer: Item$;

export const mask_subtraction_sequence: Item$;

export const mask_operation: Item$;

export const applicable_frame_range: Item$;

export const mask_frame_numbers: Item$;

export const contrast_frame_averaging: Item$;

export const mask_sub_pixel_shift: Item$;

export const tid_offset: Item$;

export const mask_operation_explanation: Item$;

export const equipment_administrator_sequence: Item$;

export const number_of_display_subsystems: Item$;

export const current_configuration_id: Item$;

export const display_subsystem_id: Item$;

export const display_subsystem_name: Item$;

export const display_subsystem_description: Item$;

export const system_status: Item$;

export const system_status_comment: Item$;

export const target_luminance_characteristics_sequence: Item$;

export const luminance_characteristics_id: Item$;

export const display_subsystem_configuration_sequence: Item$;

export const configuration_id: Item$;

export const configuration_name: Item$;

export const configuration_description: Item$;

export const referenced_target_luminance_characteristics_id: Item$;

export const qa_results_sequence: Item$;

export const display_subsystem_qa_results_sequence: Item$;

export const configuration_qa_results_sequence: Item$;

export const measurement_equipment_sequence: Item$;

export const measurement_functions: Item$;

export const measurement_equipment_type: Item$;

export const visual_evaluation_result_sequence: Item$;

export const display_calibration_result_sequence: Item$;

export const ddl_value: Item$;

export const ci_exy_white_point: Item$;

export const display_function_type: Item$;

export const gamma_value: Item$;

export const number_of_luminance_points: Item$;

export const luminance_response_sequence: Item$;

export const target_minimum_luminance: Item$;

export const target_maximum_luminance: Item$;

export const luminance_value: Item$;

export const luminance_response_description: Item$;

export const white_point_flag: Item$;

export const display_device_type_code_sequence: Item$;

export const display_subsystem_sequence: Item$;

export const luminance_result_sequence: Item$;

export const ambient_light_value_source: Item$;

export const measured_characteristics: Item$;

export const luminance_uniformity_result_sequence: Item$;

export const visual_evaluation_test_sequence: Item$;

export const test_result: Item$;

export const test_result_comment: Item$;

export const test_image_validation: Item$;

export const test_pattern_code_sequence: Item$;

export const measurement_pattern_code_sequence: Item$;

export const visual_evaluation_method_code_sequence: Item$;

export const pixel_data_provider_url: Item$;

export const data_point_rows: Item$;

export const data_point_columns: Item$;

export const signal_domain_columns: Item$;

export const largest_monochrome_pixel_value: Item$;

export const data_representation: Item$;

export const pixel_measures_sequence: Item$;

export const frame_voilut_sequence: Item$;

export const pixel_value_transformation_sequence: Item$;

export const signal_domain_rows: Item$;

export const display_filter_percentage: Item$;

export const frame_pixel_shift_sequence: Item$;

export const subtraction_item_id: Item$;

export const pixel_intensity_relationship_lut_sequence: Item$;

export const frame_pixel_data_properties_sequence: Item$;

export const geometrical_properties: Item$;

export const geometric_maximum_distortion: Item$;

export const image_processing_applied: Item$;

export const mask_selection_mode: Item$;

export const lut_function: Item$;

export const mask_visibility_percentage: Item$;

export const pixel_shift_sequence: Item$;

export const region_pixel_shift_sequence: Item$;

export const vertices_of_the_region: Item$;

export const multi_frame_presentation_sequence: Item$;

export const pixel_shift_frame_range: Item$;

export const lut_frame_range: Item$;

export const image_to_equipment_mapping_matrix: Item$;

export const equipment_coordinate_system_identification: Item$;

export const study_status_id: Item$;

export const study_priority_id: Item$;

export const study_id_issuer: Item$;

export const study_verified_date: Item$;

export const study_verified_time: Item$;

export const study_read_date: Item$;

export const study_read_time: Item$;

export const scheduled_study_start_date: Item$;

export const scheduled_study_start_time: Item$;

export const scheduled_study_stop_date: Item$;

export const scheduled_study_stop_time: Item$;

export const scheduled_study_location: Item$;

export const scheduled_study_location_ae_title: Item$;

export const reason_for_study: Item$;

export const requesting_physician_identification_sequence: Item$;

export const requesting_physician: Item$;

export const requesting_service: Item$;

export const requesting_service_code_sequence: Item$;

export const study_arrival_date: Item$;

export const study_arrival_time: Item$;

export const study_completion_date: Item$;

export const study_completion_time: Item$;

export const study_component_status_id: Item$;

export const requested_procedure_description: Item$;

export const requested_procedure_code_sequence: Item$;

export const requested_laterality_code_sequence: Item$;

export const reason_for_visit: Item$;

export const reason_for_visit_code_sequence: Item$;

export const requested_contrast_agent: Item$;

export const study_comments: Item$;

export const flow_identifier_sequence: Item$;

export const flow_identifier: Item$;

export const flow_transfer_syntax_uid: Item$;

export const flow_rtp_sampling_rate: Item$;

export const source_identifier: Item$;

export const frame_origin_timestamp: Item$;

export const includes_imaging_subject: Item$;

export const frame_usefulness_group_sequence: Item$;

export const real_time_bulk_data_flow_sequence: Item$;

export const camera_position_group_sequence: Item$;

export const includes_information: Item$;

export const time_of_frame_group_sequence: Item$;

export const referenced_patient_alias_sequence: Item$;

export const visit_status_id: Item$;

export const admission_id: Item$;

export const issuer_of_admission_id: Item$;

export const issuer_of_admission_id_sequence: Item$;

export const route_of_admissions: Item$;

export const scheduled_admission_date: Item$;

export const scheduled_admission_time: Item$;

export const scheduled_discharge_date: Item$;

export const scheduled_discharge_time: Item$;

export const scheduled_patient_institution_residence: Item$;

export const admitting_date: Item$;

export const admitting_time: Item$;

export const discharge_date: Item$;

export const discharge_time: Item$;

export const discharge_diagnosis_description: Item$;

export const discharge_diagnosis_code_sequence: Item$;

export const special_needs: Item$;

export const service_episode_id: Item$;

export const issuer_of_service_episode_id: Item$;

export const service_episode_description: Item$;

export const issuer_of_service_episode_id_sequence: Item$;

export const pertinent_documents_sequence: Item$;

export const pertinent_resources_sequence: Item$;

export const resource_description: Item$;

export const current_patient_location: Item$;

export const patient_institution_residence: Item$;

export const patient_state: Item$;

export const patient_clinical_trial_participation_sequence: Item$;

export const visit_comments: Item$;

export const waveform_originality: Item$;

export const number_of_waveform_channels: Item$;

export const number_of_waveform_samples: Item$;

export const sampling_frequency: Item$;

export const multiplex_group_label: Item$;

export const channel_definition_sequence: Item$;

export const waveform_channel_number: Item$;

export const channel_label: Item$;

export const channel_status: Item$;

export const channel_source_sequence: Item$;

export const channel_source_modifiers_sequence: Item$;

export const source_waveform_sequence: Item$;

export const channel_derivation_description: Item$;

export const channel_sensitivity: Item$;

export const channel_sensitivity_units_sequence: Item$;

export const channel_sensitivity_correction_factor: Item$;

export const channel_baseline: Item$;

export const channel_time_skew: Item$;

export const channel_sample_skew: Item$;

export const channel_offset: Item$;

export const waveform_bits_stored: Item$;

export const filter_low_frequency: Item$;

export const filter_high_frequency: Item$;

export const notch_filter_frequency: Item$;

export const notch_filter_bandwidth: Item$;

export const waveform_data_display_scale: Item$;

export const waveform_display_background_cie_lab_value: Item$;

export const waveform_presentation_group_sequence: Item$;

export const presentation_group_number: Item$;

export const channel_display_sequence: Item$;

export const channel_recommended_display_cie_lab_value: Item$;

export const channel_position: Item$;

export const display_shading_flag: Item$;

export const fractional_channel_display_scale: Item$;

export const absolute_channel_display_scale: Item$;

export const multiplexed_audio_channels_description_code_sequence: Item$;

export const channel_identification_code: Item$;

export const channel_mode: Item$;

export const multiplex_group_uid: Item$;

export const powerline_frequency: Item$;

export const channel_impedance_sequence: Item$;

export const impedance_value: Item$;

export const impedance_measurement_date_time: Item$;

export const impedance_measurement_frequency: Item$;

export const impedance_measurement_current_type: Item$;

export const waveform_amplifier_type: Item$;

export const filter_low_frequency_characteristics_sequence: Item$;

export const filter_high_frequency_characteristics_sequence: Item$;

export const summarized_filter_lookup_table: Item$;

export const notch_filter_characteristics_sequence: Item$;

export const waveform_filter_type: Item$;

export const analog_filter_characteristics_sequence: Item$;

export const analog_filter_roll_off: Item$;

export const analog_filter_type: Item$;

export const digital_filter_characteristics_sequence: Item$;

export const digital_filter_order: Item$;

export const digital_filter_type_code_sequence: Item$;

export const waveform_filter_description: Item$;

export const filter_lookup_table_sequence: Item$;

export const filter_lookup_table_description: Item$;

export const frequency_encoding_code_sequence: Item$;

export const magnitude_encoding_code_sequence: Item$;

export const filter_lookup_table_data: Item$;

export const scheduled_station_ae_title: Item$;

export const scheduled_procedure_step_start_date: Item$;

export const scheduled_procedure_step_start_time: Item$;

export const scheduled_procedure_step_end_date: Item$;

export const scheduled_procedure_step_end_time: Item$;

export const scheduled_performing_physician_name: Item$;

export const scheduled_procedure_step_description: Item$;

export const scheduled_protocol_code_sequence: Item$;

export const scheduled_procedure_step_id: Item$;

export const stage_code_sequence: Item$;

export const scheduled_performing_physician_identification_sequence: Item$;

export const scheduled_station_name: Item$;

export const scheduled_procedure_step_location: Item$;

export const pre_medication: Item$;

export const scheduled_procedure_step_status: Item$;

export const order_placer_identifier_sequence: Item$;

export const order_filler_identifier_sequence: Item$;

export const local_namespace_entity_id: Item$;

export const universal_entity_id: Item$;

export const universal_entity_id_type: Item$;

export const identifier_type_code: Item$;

export const assigning_facility_sequence: Item$;

export const assigning_jurisdiction_code_sequence: Item$;

export const assigning_agency_or_department_code_sequence: Item$;

export const scheduled_procedure_step_sequence: Item$;

export const referenced_non_image_composite_sop_instance_sequence: Item$;

export const performed_station_ae_title: Item$;

export const performed_station_name: Item$;

export const performed_location: Item$;

export const performed_procedure_step_start_date: Item$;

export const performed_procedure_step_start_time: Item$;

export const performed_procedure_step_end_date: Item$;

export const performed_procedure_step_end_time: Item$;

export const performed_procedure_step_status: Item$;

export const performed_procedure_step_id: Item$;

export const performed_procedure_step_description: Item$;

export const performed_procedure_type_description: Item$;

export const performed_protocol_code_sequence: Item$;

export const performed_protocol_type: Item$;

export const scheduled_step_attributes_sequence: Item$;

export const request_attributes_sequence: Item$;

export const comments_on_the_performed_procedure_step: Item$;

export const performed_procedure_step_discontinuation_reason_code_sequence: Item$;

export const quantity_sequence: Item$;

export const quantity: Item$;

export const measuring_units_sequence: Item$;

export const billing_item_sequence: Item$;

export const total_time_of_fluoroscopy: Item$;

export const total_number_of_exposures: Item$;

export const entrance_dose: Item$;

export const exposed_area: Item$;

export const distance_source_to_entrance: Item$;

export const distance_source_to_support: Item$;

export const exposure_dose_sequence: Item$;

export const comments_on_radiation_dose: Item$;

export const x_ray_output: Item$;

export const half_value_layer: Item$;

export const organ_dose: Item$;

export const organ_exposed: Item$;

export const billing_procedure_step_sequence: Item$;

export const film_consumption_sequence: Item$;

export const billing_supplies_and_devices_sequence: Item$;

export const referenced_procedure_step_sequence: Item$;

export const performed_series_sequence: Item$;

export const comments_on_the_scheduled_procedure_step: Item$;

export const protocol_context_sequence: Item$;

export const content_item_modifier_sequence: Item$;

export const scheduled_specimen_sequence: Item$;

export const specimen_accession_number: Item$;

export const container_identifier: Item$;

export const issuer_of_the_container_identifier_sequence: Item$;

export const alternate_container_identifier_sequence: Item$;

export const container_type_code_sequence: Item$;

export const container_description: Item$;

export const container_component_sequence: Item$;

export const specimen_sequence: Item$;

export const specimen_identifier: Item$;

export const specimen_description_sequence_trial: Item$;

export const specimen_description_trial: Item$;

export const specimen_uid: Item$;

export const acquisition_context_sequence: Item$;

export const acquisition_context_description: Item$;

export const specimen_description_sequence: Item$;

export const issuer_of_the_specimen_identifier_sequence: Item$;

export const specimen_type_code_sequence: Item$;

export const specimen_short_description: Item$;

export const specimen_detailed_description: Item$;

export const specimen_preparation_sequence: Item$;

export const specimen_preparation_step_content_item_sequence: Item$;

export const specimen_localization_content_item_sequence: Item$;

export const slide_identifier: Item$;

export const whole_slide_microscopy_image_frame_type_sequence: Item$;

export const image_center_point_coordinates_sequence: Item$;

export const x_offset_in_slide_coordinate_system: Item$;

export const y_offset_in_slide_coordinate_system: Item$;

export const z_offset_in_slide_coordinate_system: Item$;

export const pixel_spacing_sequence: Item$;

export const coordinate_system_axis_code_sequence: Item$;

export const measurement_units_code_sequence: Item$;

export const vital_stain_code_sequence_trial: Item$;

export const requested_procedure_id: Item$;

export const reason_for_the_requested_procedure: Item$;

export const requested_procedure_priority: Item$;

export const patient_transport_arrangements: Item$;

export const requested_procedure_location: Item$;

export const placer_order_number_procedure: Item$;

export const filler_order_number_procedure: Item$;

export const confidentiality_code: Item$;

export const reporting_priority: Item$;

export const reason_for_requested_procedure_code_sequence: Item$;

export const names_of_intended_recipients_of_results: Item$;

export const intended_recipients_of_results_identification_sequence: Item$;

export const reason_for_performed_procedure_code_sequence: Item$;

export const requested_procedure_description_trial: Item$;

export const person_identification_code_sequence: Item$;

export const person_address: Item$;

export const person_telephone_numbers: Item$;

export const person_telecom_information: Item$;

export const requested_procedure_comments: Item$;

export const reason_for_the_imaging_service_request: Item$;

export const issue_date_of_imaging_service_request: Item$;

export const issue_time_of_imaging_service_request: Item$;

export const placer_order_number_imaging_service_request_retired: Item$;

export const filler_order_number_imaging_service_request_retired: Item$;

export const order_entered_by: Item$;

export const order_enterer_location: Item$;

export const order_callback_phone_number: Item$;

export const order_callback_telecom_information: Item$;

export const placer_order_number_imaging_service_request: Item$;

export const filler_order_number_imaging_service_request: Item$;

export const imaging_service_request_comments: Item$;

export const confidentiality_constraint_on_patient_data_description: Item$;

export const general_purpose_scheduled_procedure_step_status: Item$;

export const general_purpose_performed_procedure_step_status: Item$;

export const general_purpose_scheduled_procedure_step_priority: Item$;

export const scheduled_processing_applications_code_sequence: Item$;

export const scheduled_procedure_step_start_date_time: Item$;

export const multiple_copies_flag: Item$;

export const performed_processing_applications_code_sequence: Item$;

export const scheduled_procedure_step_expiration_date_time: Item$;

export const human_performer_code_sequence: Item$;

export const scheduled_procedure_step_modification_date_time: Item$;

export const expected_completion_date_time: Item$;

export const resulting_general_purpose_performed_procedure_steps_sequence: Item$;

export const referenced_general_purpose_scheduled_procedure_step_sequence: Item$;

export const scheduled_workitem_code_sequence: Item$;

export const performed_workitem_code_sequence: Item$;

export const input_availability_flag: Item$;

export const input_information_sequence: Item$;

export const relevant_information_sequence: Item$;

export const referenced_general_purpose_scheduled_procedure_step_transaction_uid: Item$;

export const scheduled_station_name_code_sequence: Item$;

export const scheduled_station_class_code_sequence: Item$;

export const scheduled_station_geographic_location_code_sequence: Item$;

export const performed_station_name_code_sequence: Item$;

export const performed_station_class_code_sequence: Item$;

export const performed_station_geographic_location_code_sequence: Item$;

export const requested_subsequent_workitem_code_sequence: Item$;

export const non_dicom_output_code_sequence: Item$;

export const output_information_sequence: Item$;

export const scheduled_human_performers_sequence: Item$;

export const actual_human_performers_sequence: Item$;

export const human_performer_organization: Item$;

export const human_performer_name: Item$;

export const raw_data_handling: Item$;

export const input_readiness_state: Item$;

export const performed_procedure_step_start_date_time: Item$;

export const performed_procedure_step_end_date_time: Item$;

export const procedure_step_cancellation_date_time: Item$;

export const output_destination_sequence: Item$;

export const dicom_storage_sequence: Item$;

export const stowrs_storage_sequence: Item$;

export const storage_url: Item$;

export const xds_storage_sequence: Item$;

export const entrance_dose_inm_gy: Item$;

export const entrance_dose_derivation: Item$;

export const parametric_map_frame_type_sequence: Item$;

export const referenced_image_real_world_value_mapping_sequence: Item$;

export const real_world_value_mapping_sequence: Item$;

export const pixel_value_mapping_code_sequence: Item$;

export const lut_label: Item$;

export const real_world_value_last_value_mapped: Item$;

export const real_world_value_lut_data: Item$;

export const double_float_real_world_value_last_value_mapped: Item$;

export const double_float_real_world_value_first_value_mapped: Item$;

export const real_world_value_first_value_mapped: Item$;

export const quantity_definition_sequence: Item$;

export const real_world_value_intercept: Item$;

export const real_world_value_slope: Item$;

export const findings_flag_trial: Item$;

export const relationship_type: Item$;

export const findings_sequence_trial: Item$;

export const findings_group_uid_trial: Item$;

export const referenced_findings_group_uid_trial: Item$;

export const findings_group_recording_date_trial: Item$;

export const findings_group_recording_time_trial: Item$;

export const findings_source_category_code_sequence_trial: Item$;

export const verifying_organization: Item$;

export const documenting_organization_identifier_code_sequence_trial: Item$;

export const verification_date_time: Item$;

export const observation_date_time: Item$;

export const observation_start_date_time: Item$;

export const value_type: Item$;

export const concept_name_code_sequence: Item$;

export const measurement_precision_description_trial: Item$;

export const continuity_of_content: Item$;

export const urgency_or_priority_alerts_trial: Item$;

export const sequencing_indicator_trial: Item$;

export const document_identifier_code_sequence_trial: Item$;

export const document_author_trial: Item$;

export const document_author_identifier_code_sequence_trial: Item$;

export const identifier_code_sequence_trial: Item$;

export const verifying_observer_sequence: Item$;

export const object_binary_identifier_trial: Item$;

export const verifying_observer_name: Item$;

export const documenting_observer_identifier_code_sequence_trial: Item$;

export const author_observer_sequence: Item$;

export const participant_sequence: Item$;

export const custodial_organization_sequence: Item$;

export const participation_type: Item$;

export const participation_date_time: Item$;

export const observer_type: Item$;

export const procedure_identifier_code_sequence_trial: Item$;

export const verifying_observer_identification_code_sequence: Item$;

export const object_directory_binary_identifier_trial: Item$;

export const equivalent_cda_document_sequence: Item$;

export const referenced_waveform_channels: Item$;

export const date_of_document_or_verbal_transaction_trial: Item$;

export const time_of_document_creation_or_verbal_transaction_trial: Item$;

export const date_time: Item$;

export const date: Item$;

export const time: Item$;

export const person_name: Item$;

export const uid: Item$;

export const report_status_id_trial: Item$;

export const temporal_range_type: Item$;

export const referenced_sample_positions: Item$;

export const referenced_frame_numbers: Item$;

export const referenced_time_offsets: Item$;

export const referenced_date_time: Item$;

export const text_value: Item$;

export const floating_point_value: Item$;

export const rational_numerator_value: Item$;

export const rational_denominator_value: Item$;

export const observation_category_code_sequence_trial: Item$;

export const concept_code_sequence: Item$;

export const bibliographic_citation_trial: Item$;

export const purpose_of_reference_code_sequence: Item$;

export const observation_uid: Item$;

export const referenced_observation_uid_trial: Item$;

export const referenced_observation_class_trial: Item$;

export const referenced_object_observation_class_trial: Item$;

export const annotation_group_number: Item$;

export const observation_date_trial: Item$;

export const observation_time_trial: Item$;

export const measurement_automation_trial: Item$;

export const modifier_code_sequence: Item$;

export const identification_description_trial: Item$;

export const coordinates_set_geometric_type_trial: Item$;

export const algorithm_code_sequence_trial: Item$;

export const algorithm_description_trial: Item$;

export const pixel_coordinates_set_trial: Item$;

export const measured_value_sequence: Item$;

export const numeric_value_qualifier_code_sequence: Item$;

export const current_observer_trial: Item$;

export const numeric_value: Item$;

export const referenced_accession_sequence_trial: Item$;

export const report_status_comment_trial: Item$;

export const procedure_context_sequence_trial: Item$;

export const verbal_source_trial: Item$;

export const address_trial: Item$;

export const telephone_number_trial: Item$;

export const verbal_source_identifier_code_sequence_trial: Item$;

export const predecessor_documents_sequence: Item$;

export const referenced_request_sequence: Item$;

export const performed_procedure_code_sequence: Item$;

export const current_requested_procedure_evidence_sequence: Item$;

export const report_detail_sequence_trial: Item$;

export const pertinent_other_evidence_sequence: Item$;

export const hl7_structured_document_reference_sequence: Item$;

export const observation_subject_uid_trial: Item$;

export const observation_subject_class_trial: Item$;

export const observation_subject_type_code_sequence_trial: Item$;

export const completion_flag: Item$;

export const completion_flag_description: Item$;

export const verification_flag: Item$;

export const archive_requested: Item$;

export const preliminary_flag: Item$;

export const content_template_sequence: Item$;

export const identical_documents_sequence: Item$;

export const observation_subject_context_flag_trial: Item$;

export const observer_context_flag_trial: Item$;

export const procedure_context_flag_trial: Item$;

export const content_sequence: Item$;

export const relationship_sequence_trial: Item$;

export const relationship_type_code_sequence_trial: Item$;

export const language_code_sequence_trial: Item$;

export const tabulated_values_sequence: Item$;

export const number_of_table_rows: Item$;

export const number_of_table_columns: Item$;

export const table_row_number: Item$;

export const table_column_number: Item$;

export const table_row_definition_sequence: Item$;

export const table_column_definition_sequence: Item$;

export const cell_values_sequence: Item$;

export const uniform_resource_locator_trial: Item$;

export const waveform_annotation_sequence: Item$;

export const template_identifier: Item$;

export const template_version: Item$;

export const template_local_version: Item$;

export const template_extension_flag: Item$;

export const template_extension_organization_uid: Item$;

export const template_extension_creator_uid: Item$;

export const referenced_content_item_identifier: Item$;

export const hl7_instance_identifier: Item$;

export const hl7_document_effective_time: Item$;

export const hl7_document_type_code_sequence: Item$;

export const document_class_code_sequence: Item$;

export const retrieve_uri: Item$;

export const retrieve_location_uid: Item$;

export const type_of_instances: Item$;

export const dicom_retrieval_sequence: Item$;

export const dicom_media_retrieval_sequence: Item$;

export const wado_retrieval_sequence: Item$;

export const xds_retrieval_sequence: Item$;

export const wadors_retrieval_sequence: Item$;

export const repository_unique_id: Item$;

export const home_community_id: Item$;

export const document_title: Item$;

export const encapsulated_document: Item$;

export const mime_type_of_encapsulated_document: Item$;

export const source_instance_sequence: Item$;

export const list_of_mime_types: Item$;

export const encapsulated_document_length: Item$;

export const product_package_identifier: Item$;

export const substance_administration_approval: Item$;

export const approval_status_further_description: Item$;

export const approval_status_date_time: Item$;

export const product_type_code_sequence: Item$;

export const product_name: Item$;

export const product_description: Item$;

export const product_lot_identifier: Item$;

export const product_expiration_date_time: Item$;

export const substance_administration_date_time: Item$;

export const substance_administration_notes: Item$;

export const substance_administration_device_id: Item$;

export const product_parameter_sequence: Item$;

export const substance_administration_parameter_sequence: Item$;

export const approval_sequence: Item$;

export const assertion_code_sequence: Item$;

export const assertion_uid: Item$;

export const asserter_identification_sequence: Item$;

export const assertion_date_time: Item$;

export const assertion_expiration_date_time: Item$;

export const assertion_comments: Item$;

export const related_assertion_sequence: Item$;

export const referenced_assertion_uid: Item$;

export const approval_subject_sequence: Item$;

export const organizational_role_code_sequence: Item$;

export const lens_description: Item$;

export const right_lens_sequence: Item$;

export const left_lens_sequence: Item$;

export const unspecified_laterality_lens_sequence: Item$;

export const cylinder_sequence: Item$;

export const prism_sequence: Item$;

export const horizontal_prism_power: Item$;

export const horizontal_prism_base: Item$;

export const vertical_prism_power: Item$;

export const vertical_prism_base: Item$;

export const lens_segment_type: Item$;

export const optical_transmittance: Item$;

export const channel_width: Item$;

export const pupil_size: Item$;

export const corneal_size: Item$;

export const corneal_size_sequence: Item$;

export const autorefraction_right_eye_sequence: Item$;

export const autorefraction_left_eye_sequence: Item$;

export const distance_pupillary_distance: Item$;

export const near_pupillary_distance: Item$;

export const intermediate_pupillary_distance: Item$;

export const other_pupillary_distance: Item$;

export const keratometry_right_eye_sequence: Item$;

export const keratometry_left_eye_sequence: Item$;

export const steep_keratometric_axis_sequence: Item$;

export const radius_of_curvature: Item$;

export const keratometric_power: Item$;

export const keratometric_axis: Item$;

export const flat_keratometric_axis_sequence: Item$;

export const background_color: Item$;

export const optotype: Item$;

export const optotype_presentation: Item$;

export const subjective_refraction_right_eye_sequence: Item$;

export const subjective_refraction_left_eye_sequence: Item$;

export const add_near_sequence: Item$;

export const add_intermediate_sequence: Item$;

export const add_other_sequence: Item$;

export const add_power: Item$;

export const viewing_distance: Item$;

export const cornea_measurements_sequence: Item$;

export const source_of_cornea_measurement_data_code_sequence: Item$;

export const steep_corneal_axis_sequence: Item$;

export const flat_corneal_axis_sequence: Item$;

export const corneal_power: Item$;

export const corneal_axis: Item$;

export const cornea_measurement_method_code_sequence: Item$;

export const refractive_index_of_cornea: Item$;

export const refractive_index_of_aqueous_humor: Item$;

export const visual_acuity_type_code_sequence: Item$;

export const visual_acuity_right_eye_sequence: Item$;

export const visual_acuity_left_eye_sequence: Item$;

export const visual_acuity_both_eyes_open_sequence: Item$;

export const viewing_distance_type: Item$;

export const visual_acuity_modifiers: Item$;

export const decimal_visual_acuity: Item$;

export const optotype_detailed_definition: Item$;

export const referenced_refractive_measurements_sequence: Item$;

export const sphere_power: Item$;

export const cylinder_power: Item$;

export const corneal_topography_surface: Item$;

export const corneal_vertex_location: Item$;

export const pupil_centroid_x_coordinate: Item$;

export const pupil_centroid_y_coordinate: Item$;

export const equivalent_pupil_radius: Item$;

export const corneal_topography_map_type_code_sequence: Item$;

export const vertices_of_the_outline_of_pupil: Item$;

export const corneal_topography_mapping_normals_sequence: Item$;

export const maximum_corneal_curvature_sequence: Item$;

export const maximum_corneal_curvature: Item$;

export const maximum_corneal_curvature_location: Item$;

export const minimum_keratometric_sequence: Item$;

export const simulated_keratometric_cylinder_sequence: Item$;

export const average_corneal_power: Item$;

export const corneal_is_value: Item$;

export const analyzed_area: Item$;

export const surface_regularity_index: Item$;

export const surface_asymmetry_index: Item$;

export const corneal_eccentricity_index: Item$;

export const keratoconus_prediction_index: Item$;

export const decimal_potential_visual_acuity: Item$;

export const corneal_topography_map_quality_evaluation: Item$;

export const source_image_corneal_processed_data_sequence: Item$;

export const corneal_point_location: Item$;

export const corneal_point_estimated: Item$;

export const axial_power: Item$;

export const tangential_power: Item$;

export const refractive_power: Item$;

export const relative_elevation: Item$;

export const corneal_wavefront: Item$;

export const imaged_volume_width: Item$;

export const imaged_volume_height: Item$;

export const imaged_volume_depth: Item$;

export const total_pixel_matrix_columns: Item$;

export const total_pixel_matrix_rows: Item$;

export const total_pixel_matrix_origin_sequence: Item$;

export const specimen_label_in_image: Item$;

export const focus_method: Item$;

export const extended_depth_of_field: Item$;

export const number_of_focal_planes: Item$;

export const distance_between_focal_planes: Item$;

export const recommended_absent_pixel_cie_lab_value: Item$;

export const illuminator_type_code_sequence: Item$;

export const image_orientation_slide: Item$;

export const optical_path_sequence: Item$;

export const optical_path_identifier: Item$;

export const optical_path_description: Item$;

export const illumination_color_code_sequence: Item$;

export const specimen_reference_sequence: Item$;

export const condenser_lens_power: Item$;

export const objective_lens_power: Item$;

export const objective_lens_numerical_aperture: Item$;

export const confocal_mode: Item$;

export const tissue_location: Item$;

export const confocal_microscopy_image_frame_type_sequence: Item$;

export const image_acquisition_depth: Item$;

export const palette_color_lookup_table_sequence: Item$;

export const referenced_image_navigation_sequence: Item$;

export const top_left_hand_corner_of_localizer_area: Item$;

export const bottom_right_hand_corner_of_localizer_area: Item$;

export const optical_path_identification_sequence: Item$;

export const plane_position_slide_sequence: Item$;

export const column_position_in_total_image_pixel_matrix: Item$;

export const row_position_in_total_image_pixel_matrix: Item$;

export const pixel_origin_interpretation: Item$;

export const number_of_optical_paths: Item$;

export const total_pixel_matrix_focal_planes: Item$;

export const calibration_image: Item$;

export const device_sequence: Item$;

export const container_component_type_code_sequence: Item$;

export const container_component_thickness: Item$;

export const device_length: Item$;

export const container_component_width: Item$;

export const device_diameter: Item$;

export const device_diameter_units: Item$;

export const device_volume: Item$;

export const inter_marker_distance: Item$;

export const container_component_material: Item$;

export const container_component_id: Item$;

export const container_component_length: Item$;

export const container_component_diameter: Item$;

export const container_component_description: Item$;

export const device_description: Item$;

export const long_device_description: Item$;

export const contrast_bolus_ingredient_percent_by_volume: Item$;

export const oct_focal_distance: Item$;

export const beam_spot_size: Item$;

export const effective_refractive_index: Item$;

export const oct_acquisition_domain: Item$;

export const oct_optical_center_wavelength: Item$;

export const axial_resolution: Item$;

export const ranging_depth: Item$;

export const a_line_rate: Item$;

export const a_lines_per_frame: Item$;

export const catheter_rotational_rate: Item$;

export const a_line_pixel_spacing: Item$;

export const mode_of_percutaneous_access_sequence: Item$;

export const intravascular_oct_frame_type_sequence: Item$;

export const octz_offset_applied: Item$;

export const intravascular_frame_content_sequence: Item$;

export const intravascular_longitudinal_distance: Item$;

export const intravascular_oct_frame_content_sequence: Item$;

export const octz_offset_correction: Item$;

export const catheter_direction_of_rotation: Item$;

export const seam_line_location: Item$;

export const first_a_line_location: Item$;

export const seam_line_index: Item$;

export const number_of_padded_a_lines: Item$;

export const interpolation_type: Item$;

export const refractive_index_applied: Item$;

export const energy_window_vector: Item$;

export const number_of_energy_windows: Item$;

export const energy_window_information_sequence: Item$;

export const energy_window_range_sequence: Item$;

export const energy_window_lower_limit: Item$;

export const energy_window_upper_limit: Item$;

export const radiopharmaceutical_information_sequence: Item$;

export const residual_syringe_counts: Item$;

export const energy_window_name: Item$;

export const detector_vector: Item$;

export const number_of_detectors: Item$;

export const detector_information_sequence: Item$;

export const phase_vector: Item$;

export const number_of_phases: Item$;

export const phase_information_sequence: Item$;

export const number_of_frames_in_phase: Item$;

export const phase_delay: Item$;

export const pause_between_frames: Item$;

export const phase_description: Item$;

export const rotation_vector: Item$;

export const number_of_rotations: Item$;

export const rotation_information_sequence: Item$;

export const number_of_frames_in_rotation: Item$;

export const rr_interval_vector: Item$;

export const number_of_rr_intervals: Item$;

export const gated_information_sequence: Item$;

export const data_information_sequence: Item$;

export const time_slot_vector: Item$;

export const number_of_time_slots: Item$;

export const time_slot_information_sequence: Item$;

export const time_slot_time: Item$;

export const slice_vector: Item$;

export const number_of_slices: Item$;

export const angular_view_vector: Item$;

export const time_slice_vector: Item$;

export const number_of_time_slices: Item$;

export const start_angle: Item$;

export const type_of_detector_motion: Item$;

export const trigger_vector: Item$;

export const number_of_triggers_in_phase: Item$;

export const view_code_sequence: Item$;

export const view_modifier_code_sequence: Item$;

export const radionuclide_code_sequence: Item$;

export const administration_route_code_sequence: Item$;

export const radiopharmaceutical_code_sequence: Item$;

export const calibration_data_sequence: Item$;

export const energy_window_number: Item$;

export const image_id: Item$;

export const patient_orientation_code_sequence: Item$;

export const patient_orientation_modifier_code_sequence: Item$;

export const patient_gantry_relationship_code_sequence: Item$;

export const slice_progression_direction: Item$;

export const scan_progression_direction: Item$;

export const series_type: Item$;

export const units: Item$;

export const counts_source: Item$;

export const reprojection_method: Item$;

export const suv_type: Item$;

export const randoms_correction_method: Item$;

export const attenuation_correction_method: Item$;

export const decay_correction: Item$;

export const reconstruction_method: Item$;

export const detector_lines_of_response_used: Item$;

export const scatter_correction_method: Item$;

export const axial_acceptance: Item$;

export const axial_mash: Item$;

export const transverse_mash: Item$;

export const detector_element_size: Item$;

export const coincidence_window_width: Item$;

export const secondary_counts_type: Item$;

export const frame_reference_time: Item$;

export const primary_prompts_counts_accumulated: Item$;

export const secondary_counts_accumulated: Item$;

export const slice_sensitivity_factor: Item$;

export const decay_factor: Item$;

export const dose_calibration_factor: Item$;

export const scatter_fraction_factor: Item$;

export const dead_time_factor: Item$;

export const image_index: Item$;

export const counts_included: Item$;

export const dead_time_correction_flag: Item$;

export const histogram_sequence: Item$;

export const histogram_number_of_bins: Item$;

export const histogram_first_bin_value: Item$;

export const histogram_last_bin_value: Item$;

export const histogram_bin_width: Item$;

export const histogram_explanation: Item$;

export const histogram_data: Item$;

export const segmentation_type: Item$;

export const segment_sequence: Item$;

export const segmented_property_category_code_sequence: Item$;

export const segment_number: Item$;

export const segment_label: Item$;

export const segment_description: Item$;

export const segmentation_algorithm_identification_sequence: Item$;

export const segment_algorithm_type: Item$;

export const segment_algorithm_name: Item$;

export const segment_identification_sequence: Item$;

export const referenced_segment_number: Item$;

export const recommended_display_grayscale_value: Item$;

export const recommended_display_cie_lab_value: Item$;

export const maximum_fractional_value: Item$;

export const segmented_property_type_code_sequence: Item$;

export const segmentation_fractional_type: Item$;

export const segmented_property_type_modifier_code_sequence: Item$;

export const used_segments_sequence: Item$;

export const segments_overlap: Item$;

export const tracking_id: Item$;

export const tracking_uid: Item$;

export const deformable_registration_sequence: Item$;

export const source_frame_of_reference_uid: Item$;

export const deformable_registration_grid_sequence: Item$;

export const grid_dimensions: Item$;

export const grid_resolution: Item$;

export const vector_grid_data: Item$;

export const pre_deformation_matrix_registration_sequence: Item$;

export const post_deformation_matrix_registration_sequence: Item$;

export const number_of_surfaces: Item$;

export const surface_sequence: Item$;

export const surface_number: Item$;

export const surface_comments: Item$;

export const surface_processing: Item$;

export const surface_processing_ratio: Item$;

export const surface_processing_description: Item$;

export const recommended_presentation_opacity: Item$;

export const recommended_presentation_type: Item$;

export const finite_volume: Item$;

export const manifold: Item$;

export const surface_points_sequence: Item$;

export const surface_points_normals_sequence: Item$;

export const surface_mesh_primitives_sequence: Item$;

export const number_of_surface_points: Item$;

export const point_coordinates_data: Item$;

export const point_position_accuracy: Item$;

export const mean_point_distance: Item$;

export const maximum_point_distance: Item$;

export const points_bounding_box_coordinates: Item$;

export const axis_of_rotation: Item$;

export const center_of_rotation: Item$;

export const number_of_vectors: Item$;

export const vector_dimensionality: Item$;

export const vector_accuracy: Item$;

export const vector_coordinate_data: Item$;

export const double_point_coordinates_data: Item$;

export const triangle_point_index_list: Item$;

export const edge_point_index_list: Item$;

export const vertex_point_index_list: Item$;

export const triangle_strip_sequence: Item$;

export const triangle_fan_sequence: Item$;

export const line_sequence: Item$;

export const primitive_point_index_list: Item$;

export const surface_count: Item$;

export const referenced_surface_sequence: Item$;

export const referenced_surface_number: Item$;

export const segment_surface_generation_algorithm_identification_sequence: Item$;

export const segment_surface_source_instance_sequence: Item$;

export const algorithm_family_code_sequence: Item$;

export const algorithm_name_code_sequence: Item$;

export const algorithm_version: Item$;

export const algorithm_parameters: Item$;

export const facet_sequence: Item$;

export const surface_processing_algorithm_identification_sequence: Item$;

export const algorithm_name: Item$;

export const recommended_point_radius: Item$;

export const recommended_line_thickness: Item$;

export const long_primitive_point_index_list: Item$;

export const long_triangle_point_index_list: Item$;

export const long_edge_point_index_list: Item$;

export const long_vertex_point_index_list: Item$;

export const track_set_sequence: Item$;

export const track_sequence: Item$;

export const recommended_display_cie_lab_value_list: Item$;

export const tracking_algorithm_identification_sequence: Item$;

export const track_set_number: Item$;

export const track_set_label: Item$;

export const track_set_description: Item$;

export const track_set_anatomical_type_code_sequence: Item$;

export const measurements_sequence: Item$;

export const track_set_statistics_sequence: Item$;

export const floating_point_values: Item$;

export const track_point_index_list: Item$;

export const track_statistics_sequence: Item$;

export const measurement_values_sequence: Item$;

export const diffusion_acquisition_code_sequence: Item$;

export const diffusion_model_code_sequence: Item$;

export const implant_size: Item$;

export const implant_template_version: Item$;

export const replaced_implant_template_sequence: Item$;

export const implant_type: Item$;

export const derivation_implant_template_sequence: Item$;

export const original_implant_template_sequence: Item$;

export const effective_date_time: Item$;

export const implant_target_anatomy_sequence: Item$;

export const information_from_manufacturer_sequence: Item$;

export const notification_from_manufacturer_sequence: Item$;

export const information_issue_date_time: Item$;

export const information_summary: Item$;

export const implant_regulatory_disapproval_code_sequence: Item$;

export const overall_template_spatial_tolerance: Item$;

export const hpgl_document_sequence: Item$;

export const hpgl_document_id: Item$;

export const hpgl_document_label: Item$;

export const view_orientation_code_sequence: Item$;

export const view_orientation_modifier_code_sequence: Item$;

export const hpgl_document_scaling: Item$;

export const hpgl_document: Item$;

export const hpgl_contour_pen_number: Item$;

export const hpgl_pen_sequence: Item$;

export const hpgl_pen_number: Item$;

export const hpgl_pen_label: Item$;

export const hpgl_pen_description: Item$;

export const recommended_rotation_point: Item$;

export const bounding_rectangle: Item$;

export const implant_template_3d_model_surface_number: Item$;

export const surface_model_description_sequence: Item$;

export const surface_model_label: Item$;

export const surface_model_scaling_factor: Item$;

export const materials_code_sequence: Item$;

export const coating_materials_code_sequence: Item$;

export const implant_type_code_sequence: Item$;

export const fixation_method_code_sequence: Item$;

export const mating_feature_sets_sequence: Item$;

export const mating_feature_set_id: Item$;

export const mating_feature_set_label: Item$;

export const mating_feature_sequence: Item$;

export const mating_feature_id: Item$;

export const mating_feature_degree_of_freedom_sequence: Item$;

export const degree_of_freedom_id: Item$;

export const degree_of_freedom_type: Item$;

export const two_d_mating_feature_coordinates_sequence: Item$;

export const referenced_hpgl_document_id: Item$;

export const two_d_mating_point: Item$;

export const two_d_mating_axes: Item$;

export const two_d_degree_of_freedom_sequence: Item$;

export const three_d_degree_of_freedom_axis: Item$;

export const range_of_freedom: Item$;

export const three_d_mating_point: Item$;

export const three_d_mating_axes: Item$;

export const two_d_degree_of_freedom_axis: Item$;

export const planning_landmark_point_sequence: Item$;

export const planning_landmark_line_sequence: Item$;

export const planning_landmark_plane_sequence: Item$;

export const planning_landmark_id: Item$;

export const planning_landmark_description: Item$;

export const planning_landmark_identification_code_sequence: Item$;

export const two_d_point_coordinates_sequence: Item$;

export const two_d_point_coordinates: Item$;

export const three_d_point_coordinates: Item$;

export const two_d_line_coordinates_sequence: Item$;

export const two_d_line_coordinates: Item$;

export const three_d_line_coordinates: Item$;

export const two_d_plane_coordinates_sequence: Item$;

export const two_d_plane_intersection: Item$;

export const three_d_plane_origin: Item$;

export const three_d_plane_normal: Item$;

export const model_modification: Item$;

export const model_mirroring: Item$;

export const model_usage_code_sequence: Item$;

export const model_group_uid: Item$;

export const relative_uri_reference_within_encapsulated_document: Item$;

export const annotation_coordinate_type: Item$;

export const annotation_group_sequence: Item$;

export const annotation_group_uid: Item$;

export const annotation_group_label: Item$;

export const annotation_group_description: Item$;

export const annotation_group_generation_type: Item$;

export const annotation_group_algorithm_identification_sequence: Item$;

export const annotation_property_category_code_sequence: Item$;

export const annotation_property_type_code_sequence: Item$;

export const annotation_property_type_modifier_code_sequence: Item$;

export const number_of_annotations: Item$;

export const annotation_applies_to_all_optical_paths: Item$;

export const referenced_optical_path_identifier: Item$;

export const annotation_applies_to_all_z_planes: Item$;

export const common_z_coordinate_value: Item$;

export const annotation_index_list: Item$;

export const graphic_annotation_sequence: Item$;

export const graphic_layer: Item$;

export const bounding_box_annotation_units: Item$;

export const anchor_point_annotation_units: Item$;

export const graphic_annotation_units: Item$;

export const unformatted_text_value: Item$;

export const text_object_sequence: Item$;

export const graphic_object_sequence: Item$;

export const bounding_box_top_left_hand_corner: Item$;

export const bounding_box_bottom_right_hand_corner: Item$;

export const bounding_box_text_horizontal_justification: Item$;

export const anchor_point: Item$;

export const anchor_point_visibility: Item$;

export const graphic_dimensions: Item$;

export const number_of_graphic_points: Item$;

export const graphic_data: Item$;

export const graphic_type: Item$;

export const graphic_filled: Item$;

export const image_rotation_retired: Item$;

export const image_horizontal_flip: Item$;

export const image_rotation: Item$;

export const displayed_area_top_left_hand_corner_trial: Item$;

export const displayed_area_bottom_right_hand_corner_trial: Item$;

export const displayed_area_top_left_hand_corner: Item$;

export const displayed_area_bottom_right_hand_corner: Item$;

export const displayed_area_selection_sequence: Item$;

export const graphic_layer_sequence: Item$;

export const graphic_layer_order: Item$;

export const graphic_layer_recommended_display_grayscale_value: Item$;

export const graphic_layer_recommended_display_rgb_value: Item$;

export const graphic_layer_description: Item$;

export const content_label: Item$;

export const content_description: Item$;

export const presentation_creation_date: Item$;

export const presentation_creation_time: Item$;

export const content_creator_name: Item$;

export const content_creator_identification_code_sequence: Item$;

export const alternate_content_description_sequence: Item$;

export const presentation_size_mode: Item$;

export const presentation_pixel_spacing: Item$;

export const presentation_pixel_aspect_ratio: Item$;

export const presentation_pixel_magnification_ratio: Item$;

export const graphic_group_label: Item$;

export const graphic_group_description: Item$;

export const compound_graphic_sequence: Item$;

export const compound_graphic_instance_id: Item$;

export const font_name: Item$;

export const font_name_type: Item$;

export const css_font_name: Item$;

export const rotation_angle: Item$;

export const text_style_sequence: Item$;

export const line_style_sequence: Item$;

export const fill_style_sequence: Item$;

export const graphic_group_sequence: Item$;

export const text_color_cie_lab_value: Item$;

export const horizontal_alignment: Item$;

export const vertical_alignment: Item$;

export const shadow_style: Item$;

export const shadow_offset_x: Item$;

export const shadow_offset_y: Item$;

export const shadow_color_cie_lab_value: Item$;

export const underlined: Item$;

export const bold: Item$;

export const italic: Item$;

export const pattern_on_color_cie_lab_value: Item$;

export const pattern_off_color_cie_lab_value: Item$;

export const line_thickness: Item$;

export const line_dashing_style: Item$;

export const line_pattern: Item$;

export const fill_pattern: Item$;

export const fill_mode: Item$;

export const shadow_opacity: Item$;

export const gap_length: Item$;

export const diameter_of_visibility: Item$;

export const rotation_point: Item$;

export const tick_alignment: Item$;

export const show_tick_label: Item$;

export const tick_label_alignment: Item$;

export const compound_graphic_units: Item$;

export const pattern_on_opacity: Item$;

export const pattern_off_opacity: Item$;

export const major_ticks_sequence: Item$;

export const tick_position: Item$;

export const tick_label: Item$;

export const compound_graphic_type: Item$;

export const graphic_group_id: Item$;

export const shape_type: Item$;

export const registration_sequence: Item$;

export const matrix_registration_sequence: Item$;

export const matrix_sequence: Item$;

export const frame_of_reference_to_displayed_coordinate_system_transformation_matrix: Item$;

export const frame_of_reference_transformation_matrix_type: Item$;

export const registration_type_code_sequence: Item$;

export const fiducial_description: Item$;

export const fiducial_identifier: Item$;

export const fiducial_identifier_code_sequence: Item$;

export const contour_uncertainty_radius: Item$;

export const used_fiducials_sequence: Item$;

export const used_rt_structure_set_roi_sequence: Item$;

export const graphic_coordinates_data_sequence: Item$;

export const fiducial_uid: Item$;

export const referenced_fiducial_uid: Item$;

export const fiducial_set_sequence: Item$;

export const fiducial_sequence: Item$;

export const fiducials_property_category_code_sequence: Item$;

export const graphic_layer_recommended_display_cie_lab_value: Item$;

export const blending_sequence: Item$;

export const relative_opacity: Item$;

export const referenced_spatial_registration_sequence: Item$;

export const blending_position: Item$;

export const presentation_display_collection_uid: Item$;

export const presentation_sequence_collection_uid: Item$;

export const presentation_sequence_position_index: Item$;

export const rendered_image_reference_sequence: Item$;

export const volumetric_presentation_state_input_sequence: Item$;

export const presentation_input_type: Item$;

export const input_sequence_position_index: Item$;

export const crop: Item$;

export const cropping_specification_index: Item$;

export const compositing_method: Item$;

export const volumetric_presentation_input_number: Item$;

export const image_volume_geometry: Item$;

export const volumetric_presentation_input_set_uid: Item$;

export const volumetric_presentation_input_set_sequence: Item$;

export const global_crop: Item$;

export const global_cropping_specification_index: Item$;

export const rendering_method: Item$;

export const volume_cropping_sequence: Item$;

export const volume_cropping_method: Item$;

export const bounding_box_crop: Item$;

export const oblique_cropping_plane_sequence: Item$;

export const plane: Item$;

export const plane_normal: Item$;

export const cropping_specification_number: Item$;

export const multi_planar_reconstruction_style: Item$;

export const mpr_thickness_type: Item$;

export const mpr_slab_thickness: Item$;

export const mpr_top_left_hand_corner: Item$;

export const mpr_view_width_direction: Item$;

export const mpr_view_width: Item$;

export const number_of_volumetric_curve_points: Item$;

export const volumetric_curve_points: Item$;

export const mpr_view_height_direction: Item$;

export const mpr_view_height: Item$;

export const render_projection: Item$;

export const viewpoint_position: Item$;

export const viewpoint_look_at_point: Item$;

export const viewpoint_up_direction: Item$;

export const render_field_of_view: Item$;

export const sampling_step_size: Item$;

export const shading_style: Item$;

export const ambient_reflection_intensity: Item$;

export const light_direction: Item$;

export const diffuse_reflection_intensity: Item$;

export const specular_reflection_intensity: Item$;

export const shininess: Item$;

export const presentation_state_classification_component_sequence: Item$;

export const component_type: Item$;

export const component_input_sequence: Item$;

export const volumetric_presentation_input_index: Item$;

export const presentation_state_compositor_component_sequence: Item$;

export const weighting_transfer_function_sequence: Item$;

export const weighting_lookup_table_descriptor: Item$;

export const weighting_lookup_table_data: Item$;

export const volumetric_annotation_sequence: Item$;

export const referenced_structured_context_sequence: Item$;

export const referenced_content_item: Item$;

export const volumetric_presentation_input_annotation_sequence: Item$;

export const annotation_clipping: Item$;

export const presentation_animation_style: Item$;

export const recommended_animation_rate: Item$;

export const animation_curve_sequence: Item$;

export const animation_step_size: Item$;

export const swivel_range: Item$;

export const volumetric_curve_up_directions: Item$;

export const volume_stream_sequence: Item$;

export const rgba_transfer_function_description: Item$;

export const advanced_blending_sequence: Item$;

export const blending_input_number: Item$;

export const blending_display_input_sequence: Item$;

export const blending_display_sequence: Item$;

export const blending_mode: Item$;

export const time_series_blending: Item$;

export const geometry_for_display: Item$;

export const threshold_sequence: Item$;

export const threshold_value_sequence: Item$;

export const threshold_type: Item$;

export const threshold_value: Item$;

export const hanging_protocol_name: Item$;

export const hanging_protocol_description: Item$;

export const hanging_protocol_level: Item$;

export const hanging_protocol_creator: Item$;

export const hanging_protocol_creation_date_time: Item$;

export const hanging_protocol_definition_sequence: Item$;

export const hanging_protocol_user_identification_code_sequence: Item$;

export const hanging_protocol_user_group_name: Item$;

export const source_hanging_protocol_sequence: Item$;

export const number_of_priors_referenced: Item$;

export const image_sets_sequence: Item$;

export const image_set_selector_sequence: Item$;

export const image_set_selector_usage_flag: Item$;

export const selector_attribute: Item$;

export const selector_value_number: Item$;

export const time_based_image_sets_sequence: Item$;

export const image_set_number: Item$;

export const image_set_selector_category: Item$;

export const relative_time: Item$;

export const relative_time_units: Item$;

export const abstract_prior_value: Item$;

export const abstract_prior_code_sequence: Item$;

export const image_set_label: Item$;

export const selector_attribute_vr: Item$;

export const selector_sequence_pointer: Item$;

export const selector_sequence_pointer_private_creator: Item$;

export const selector_attribute_private_creator: Item$;

export const selector_ae_value: Item$;

export const selector_as_value: Item$;

export const selector_at_value: Item$;

export const selector_da_value: Item$;

export const selector_cs_value: Item$;

export const selector_dt_value: Item$;

export const selector_is_value: Item$;

export const selector_ob_value: Item$;

export const selector_lo_value: Item$;

export const selector_of_value: Item$;

export const selector_lt_value: Item$;

export const selector_ow_value: Item$;

export const selector_pn_value: Item$;

export const selector_tm_value: Item$;

export const selector_sh_value: Item$;

export const selector_un_value: Item$;

export const selector_st_value: Item$;

export const selector_uc_value: Item$;

export const selector_ut_value: Item$;

export const selector_ur_value: Item$;

export const selector_ds_value: Item$;

export const selector_od_value: Item$;

export const selector_fd_value: Item$;

export const selector_ol_value: Item$;

export const selector_fl_value: Item$;

export const selector_ul_value: Item$;

export const selector_us_value: Item$;

export const selector_sl_value: Item$;

export const selector_ss_value: Item$;

export const selector_ui_value: Item$;

export const selector_code_sequence_value: Item$;

export const selector_ov_value: Item$;

export const selector_sv_value: Item$;

export const selector_uv_value: Item$;

export const number_of_screens: Item$;

export const nominal_screen_definition_sequence: Item$;

export const number_of_vertical_pixels: Item$;

export const number_of_horizontal_pixels: Item$;

export const display_environment_spatial_position: Item$;

export const screen_minimum_grayscale_bit_depth: Item$;

export const screen_minimum_color_bit_depth: Item$;

export const application_maximum_repaint_time: Item$;

export const display_sets_sequence: Item$;

export const display_set_number: Item$;

export const display_set_label: Item$;

export const display_set_presentation_group: Item$;

export const display_set_presentation_group_description: Item$;

export const partial_data_display_handling: Item$;

export const synchronized_scrolling_sequence: Item$;

export const display_set_scrolling_group: Item$;

export const navigation_indicator_sequence: Item$;

export const navigation_display_set: Item$;

export const reference_display_sets: Item$;

export const image_boxes_sequence: Item$;

export const image_box_number: Item$;

export const image_box_layout_type: Item$;

export const image_box_tile_horizontal_dimension: Item$;

export const image_box_tile_vertical_dimension: Item$;

export const image_box_scroll_direction: Item$;

export const image_box_small_scroll_type: Item$;

export const image_box_small_scroll_amount: Item$;

export const image_box_large_scroll_type: Item$;

export const image_box_large_scroll_amount: Item$;

export const image_box_overlap_priority: Item$;

export const cine_relative_to_real_time: Item$;

export const filter_operations_sequence: Item$;

export const filter_by_category: Item$;

export const filter_by_attribute_presence: Item$;

export const filter_by_operator: Item$;

export const structured_display_background_cie_lab_value: Item$;

export const empty_image_box_cie_lab_value: Item$;

export const structured_display_image_box_sequence: Item$;

export const structured_display_text_box_sequence: Item$;

export const referenced_first_frame_sequence: Item$;

export const image_box_synchronization_sequence: Item$;

export const synchronized_image_box_list: Item$;

export const type_of_synchronization: Item$;

export const blending_operation_type: Item$;

export const reformatting_operation_type: Item$;

export const reformatting_thickness: Item$;

export const reformatting_interval: Item$;

export const reformatting_operation_initial_view_direction: Item$;

export const three_d_rendering_type: Item$;

export const sorting_operations_sequence: Item$;

export const sort_by_category: Item$;

export const sorting_direction: Item$;

export const display_set_patient_orientation: Item$;

export const voi_type: Item$;

export const pseudo_color_type: Item$;

export const pseudo_color_palette_instance_reference_sequence: Item$;

export const show_grayscale_inverted: Item$;

export const show_image_true_size_flag: Item$;

export const show_graphic_annotation_flag: Item$;

export const show_patient_demographics_flag: Item$;

export const show_acquisition_techniques_flag: Item$;

export const display_set_horizontal_justification: Item$;

export const display_set_vertical_justification: Item$;

export const continuation_start_meterset: Item$;

export const continuation_end_meterset: Item$;

export const procedure_step_state: Item$;

export const procedure_step_progress_information_sequence: Item$;

export const procedure_step_progress: Item$;

export const procedure_step_progress_description: Item$;

export const procedure_step_progress_parameters_sequence: Item$;

export const procedure_step_communications_uri_sequence: Item$;

export const contact_uri: Item$;

export const contact_display_name: Item$;

export const procedure_step_discontinuation_reason_code_sequence: Item$;

export const beam_task_sequence: Item$;

export const beam_task_type: Item$;

export const beam_order_index_trial: Item$;

export const autosequence_flag: Item$;

export const table_top_vertical_adjusted_position: Item$;

export const table_top_longitudinal_adjusted_position: Item$;

export const table_top_lateral_adjusted_position: Item$;

export const patient_support_adjusted_angle: Item$;

export const table_top_eccentric_adjusted_angle: Item$;

export const table_top_pitch_adjusted_angle: Item$;

export const table_top_roll_adjusted_angle: Item$;

export const delivery_verification_image_sequence: Item$;

export const verification_image_timing: Item$;

export const double_exposure_flag: Item$;

export const double_exposure_ordering: Item$;

export const double_exposure_meterset_trial: Item$;

export const double_exposure_field_delta_trial: Item$;

export const related_reference_rt_image_sequence: Item$;

export const general_machine_verification_sequence: Item$;

export const conventional_machine_verification_sequence: Item$;

export const ion_machine_verification_sequence: Item$;

export const failed_attributes_sequence: Item$;

export const overridden_attributes_sequence: Item$;

export const conventional_control_point_verification_sequence: Item$;

export const ion_control_point_verification_sequence: Item$;

export const attribute_occurrence_sequence: Item$;

export const attribute_occurrence_pointer: Item$;

export const attribute_item_selector: Item$;

export const attribute_occurrence_private_creator: Item$;

export const selector_sequence_pointer_items: Item$;

export const scheduled_procedure_step_priority: Item$;

export const worklist_label: Item$;

export const procedure_step_label: Item$;

export const scheduled_processing_parameters_sequence: Item$;

export const performed_processing_parameters_sequence: Item$;

export const unified_procedure_step_performed_procedure_sequence: Item$;

export const related_procedure_step_sequence: Item$;

export const procedure_step_relationship_type: Item$;

export const replaced_procedure_step_sequence: Item$;

export const deletion_lock: Item$;

export const receiving_ae: Item$;

export const requesting_ae: Item$;

export const reason_for_cancellation: Item$;

export const scp_status: Item$;

export const subscription_list_status: Item$;

export const unified_procedure_step_list_status: Item$;

export const beam_order_index: Item$;

export const double_exposure_meterset: Item$;

export const double_exposure_field_delta: Item$;

export const brachy_task_sequence: Item$;

export const continuation_start_total_reference_air_kerma: Item$;

export const continuation_end_total_reference_air_kerma: Item$;

export const continuation_pulse_number: Item$;

export const channel_delivery_order_sequence: Item$;

export const referenced_channel_number: Item$;

export const start_cumulative_time_weight: Item$;

export const end_cumulative_time_weight: Item$;

export const omitted_channel_sequence: Item$;

export const reason_for_channel_omission: Item$;

export const reason_for_channel_omission_description: Item$;

export const channel_delivery_order_index: Item$;

export const channel_delivery_continuation_sequence: Item$;

export const omitted_application_setup_sequence: Item$;

export const implant_assembly_template_name: Item$;

export const implant_assembly_template_issuer: Item$;

export const implant_assembly_template_version: Item$;

export const replaced_implant_assembly_template_sequence: Item$;

export const implant_assembly_template_type: Item$;

export const original_implant_assembly_template_sequence: Item$;

export const derivation_implant_assembly_template_sequence: Item$;

export const implant_assembly_template_target_anatomy_sequence: Item$;

export const procedure_type_code_sequence: Item$;

export const surgical_technique: Item$;

export const component_types_sequence: Item$;

export const component_type_code_sequence: Item$;

export const exclusive_component_type: Item$;

export const mandatory_component_type: Item$;

export const component_sequence: Item$;

export const component_id: Item$;

export const component_assembly_sequence: Item$;

export const component_1_referenced_id: Item$;

export const component_1_referenced_mating_feature_set_id: Item$;

export const component_1_referenced_mating_feature_id: Item$;

export const component_2_referenced_id: Item$;

export const component_2_referenced_mating_feature_set_id: Item$;

export const component_2_referenced_mating_feature_id: Item$;

export const implant_template_group_name: Item$;

export const implant_template_group_description: Item$;

export const implant_template_group_issuer: Item$;

export const implant_template_group_version: Item$;

export const replaced_implant_template_group_sequence: Item$;

export const implant_template_group_target_anatomy_sequence: Item$;

export const implant_template_group_members_sequence: Item$;

export const implant_template_group_member_id: Item$;

export const three_d_implant_template_group_member_matching_point: Item$;

export const three_d_implant_template_group_member_matching_axes: Item$;

export const implant_template_group_member_matching_2d_coordinates_sequence: Item$;

export const two_d_implant_template_group_member_matching_point: Item$;

export const two_d_implant_template_group_member_matching_axes: Item$;

export const implant_template_group_variation_dimension_sequence: Item$;

export const implant_template_group_variation_dimension_name: Item$;

export const implant_template_group_variation_dimension_rank_sequence: Item$;

export const referenced_implant_template_group_member_id: Item$;

export const implant_template_group_variation_dimension_rank: Item$;

export const surface_scan_acquisition_type_code_sequence: Item$;

export const surface_scan_mode_code_sequence: Item$;

export const registration_method_code_sequence: Item$;

export const shot_duration_time: Item$;

export const shot_offset_time: Item$;

export const surface_point_presentation_value_data: Item$;

export const surface_point_color_cie_lab_value_data: Item$;

export const uv_mapping_sequence: Item$;

export const texture_label: Item$;

export const u_value_data: Item$;

export const v_value_data: Item$;

export const referenced_texture_sequence: Item$;

export const referenced_surface_data_sequence: Item$;

export const assessment_summary: Item$;

export const assessment_summary_description: Item$;

export const assessed_sop_instance_sequence: Item$;

export const referenced_comparison_sop_instance_sequence: Item$;

export const number_of_assessment_observations: Item$;

export const assessment_observations_sequence: Item$;

export const observation_significance: Item$;

export const observation_description: Item$;

export const structured_constraint_observation_sequence: Item$;

export const assessed_attribute_value_sequence: Item$;

export const assessment_set_id: Item$;

export const assessment_requester_sequence: Item$;

export const selector_attribute_name: Item$;

export const selector_attribute_keyword: Item$;

export const assessment_type_code_sequence: Item$;

export const observation_basis_code_sequence: Item$;

export const assessment_label: Item$;

export const constraint_type: Item$;

export const specification_selection_guidance: Item$;

export const constraint_value_sequence: Item$;

export const recommended_default_value_sequence: Item$;

export const constraint_violation_significance: Item$;

export const constraint_violation_condition: Item$;

export const modifiable_constraint_flag: Item$;

export const storage_media_file_set_id: Item$;

export const storage_media_file_set_uid: Item$;

export const icon_image_sequence: Item$;

export const topic_title: Item$;

export const topic_subject: Item$;

export const topic_author: Item$;

export const topic_keywords: Item$;

export const sop_instance_status: Item$;

export const sop_authorization_date_time: Item$;

export const sop_authorization_comment: Item$;

export const authorization_equipment_certification_number: Item$;

export const macid_number: Item$;

export const mac_calculation_transfer_syntax_uid: Item$;

export const mac_algorithm: Item$;

export const data_elements_signed: Item$;

export const digital_signature_uid: Item$;

export const digital_signature_date_time: Item$;

export const certificate_type: Item$;

export const certificate_of_signer: Item$;

export const signature: Item$;

export const certified_timestamp_type: Item$;

export const certified_timestamp: Item$;

export const digital_signature_purpose_code_sequence: Item$;

export const referenced_digital_signature_sequence: Item$;

export const referenced_sop_instance_mac_sequence: Item$;

export const mac: Item$;

export const encrypted_attributes_sequence: Item$;

export const encrypted_content_transfer_syntax_uid: Item$;

export const encrypted_content: Item$;

export const modified_attributes_sequence: Item$;

export const nonconforming_modified_attributes_sequence: Item$;

export const nonconforming_data_element_value: Item$;

export const original_attributes_sequence: Item$;

export const attribute_modification_date_time: Item$;

export const modifying_system: Item$;

export const source_of_previous_values: Item$;

export const reason_for_the_attribute_modification: Item$;

export const instance_origin_status: Item$;

export const escape_triplet: Item$;

export const run_length_triplet: Item$;

export const huffman_table_size: Item$;

export const huffman_table_triplet: Item$;

export const shift_table_size: Item$;

export const shift_table_triplet: Item$;

export const zonal_map: Item$;

export const number_of_copies: Item$;

export const printer_configuration_sequence: Item$;

export const print_priority: Item$;

export const medium_type: Item$;

export const film_destination: Item$;

export const film_session_label: Item$;

export const memory_allocation: Item$;

export const maximum_memory_allocation: Item$;

export const color_image_printing_flag: Item$;

export const collation_flag: Item$;

export const annotation_flag: Item$;

export const image_overlay_flag: Item$;

export const presentation_lut_flag: Item$;

export const image_box_presentation_lut_flag: Item$;

export const memory_bit_depth: Item$;

export const printing_bit_depth: Item$;

export const media_installed_sequence: Item$;

export const other_media_available_sequence: Item$;

export const supported_image_display_formats_sequence: Item$;

export const referenced_film_box_sequence: Item$;

export const referenced_stored_print_sequence: Item$;

export const image_display_format: Item$;

export const annotation_display_format_id: Item$;

export const film_orientation: Item$;

export const film_size_id: Item$;

export const printer_resolution_id: Item$;

export const default_printer_resolution_id: Item$;

export const magnification_type: Item$;

export const smoothing_type: Item$;

export const default_magnification_type: Item$;

export const other_magnification_types_available: Item$;

export const default_smoothing_type: Item$;

export const other_smoothing_types_available: Item$;

export const border_density: Item$;

export const empty_image_density: Item$;

export const min_density: Item$;

export const max_density: Item$;

export const trim: Item$;

export const configuration_information: Item$;

export const configuration_information_description: Item$;

export const maximum_collated_films: Item$;

export const illumination: Item$;

export const reflected_ambient_light: Item$;

export const printer_pixel_spacing: Item$;

export const referenced_film_session_sequence: Item$;

export const referenced_image_box_sequence: Item$;

export const referenced_basic_annotation_box_sequence: Item$;

export const image_box_position: Item$;

export const polarity: Item$;

export const requested_image_size: Item$;

export const requested_decimate_crop_behavior: Item$;

export const requested_resolution_id: Item$;

export const requested_image_size_flag: Item$;

export const decimate_crop_result: Item$;

export const basic_grayscale_image_sequence: Item$;

export const basic_color_image_sequence: Item$;

export const referenced_image_overlay_box_sequence: Item$;

export const referenced_voilut_box_sequence: Item$;

export const annotation_position: Item$;

export const text_string: Item$;

export const referenced_overlay_plane_sequence: Item$;

export const referenced_overlay_plane_groups: Item$;

export const overlay_pixel_data_sequence: Item$;

export const overlay_magnification_type: Item$;

export const overlay_smoothing_type: Item$;

export const overlay_or_image_magnification: Item$;

export const magnify_to_number_of_columns: Item$;

export const overlay_foreground_density: Item$;

export const overlay_background_density: Item$;

export const overlay_mode: Item$;

export const threshold_density: Item$;

export const referenced_image_box_sequence_retired: Item$;

export const presentation_lut_sequence: Item$;

export const presentation_lut_shape: Item$;

export const referenced_presentation_lut_sequence: Item$;

export const print_job_id: Item$;

export const execution_status: Item$;

export const execution_status_info: Item$;

export const creation_date: Item$;

export const creation_time: Item$;

export const originator: Item$;

export const destination_ae: Item$;

export const owner_id: Item$;

export const number_of_films: Item$;

export const referenced_print_job_sequence_pull_stored_print: Item$;

export const printer_status: Item$;

export const printer_status_info: Item$;

export const printer_name: Item$;

export const print_queue_id: Item$;

export const queue_status: Item$;

export const print_job_description_sequence: Item$;

export const referenced_print_job_sequence: Item$;

export const print_management_capabilities_sequence: Item$;

export const printer_characteristics_sequence: Item$;

export const film_box_content_sequence: Item$;

export const image_box_content_sequence: Item$;

export const annotation_content_sequence: Item$;

export const image_overlay_box_content_sequence: Item$;

export const presentation_lut_content_sequence: Item$;

export const proposed_study_sequence: Item$;

export const original_image_sequence: Item$;

export const label_using_information_extracted_from_instances: Item$;

export const label_text: Item$;

export const label_style_selection: Item$;

export const media_disposition: Item$;

export const barcode_value: Item$;

export const barcode_symbology: Item$;

export const allow_media_splitting: Item$;

export const include_non_dicom_objects: Item$;

export const include_display_application: Item$;

export const preserve_composite_instances_after_media_creation: Item$;

export const total_number_of_pieces_of_media_created: Item$;

export const requested_media_application_profile: Item$;

export const referenced_storage_media_sequence: Item$;

export const failure_attributes: Item$;

export const allow_lossy_compression: Item$;

export const request_priority: Item$;

export const rt_image_label: Item$;

export const rt_image_name: Item$;

export const rt_image_description: Item$;

export const reported_values_origin: Item$;

export const rt_image_plane: Item$;

export const x_ray_image_receptor_translation: Item$;

export const x_ray_image_receptor_angle: Item$;

export const rt_image_orientation: Item$;

export const image_plane_pixel_spacing: Item$;

export const rt_image_position: Item$;

export const radiation_machine_name: Item$;

export const radiation_machine_sad: Item$;

export const radiation_machine_ssd: Item$;

export const rt_image_sid: Item$;

export const source_to_reference_object_distance: Item$;

export const fraction_number: Item$;

export const exposure_sequence: Item$;

export const meterset_exposure: Item$;

export const diaphragm_position: Item$;

export const fluence_map_sequence: Item$;

export const fluence_data_source: Item$;

export const fluence_data_scale: Item$;

export const primary_fluence_mode_sequence: Item$;

export const fluence_mode: Item$;

export const fluence_mode_id: Item$;

export const selected_frame_number: Item$;

export const selected_frame_functional_groups_sequence: Item$;

export const rt_image_frame_general_content_sequence: Item$;

export const rt_image_frame_context_sequence: Item$;

export const rt_image_scope_sequence: Item$;

export const beam_modifier_coordinates_presence_flag: Item$;

export const start_cumulative_meterset: Item$;

export const stop_cumulative_meterset: Item$;

export const rt_acquisition_patient_position_sequence: Item$;

export const rt_image_frame_imaging_device_position_sequence: Item$;

export const rt_image_framek_v_radiation_acquisition_sequence: Item$;

export const rt_image_frame_mv_radiation_acquisition_sequence: Item$;

export const rt_image_frame_radiation_acquisition_sequence: Item$;

export const imaging_source_position_sequence: Item$;

export const image_receptor_position_sequence: Item$;

export const device_position_to_equipment_mapping_matrix: Item$;

export const device_position_parameter_sequence: Item$;

export const imaging_source_location_specification_type: Item$;

export const imaging_device_location_matrix_sequence: Item$;

export const imaging_device_location_parameter_sequence: Item$;

export const imaging_aperture_sequence: Item$;

export const imaging_aperture_specification_type: Item$;

export const number_of_acquisition_devices: Item$;

export const acquisition_device_sequence: Item$;

export const acquisition_task_sequence: Item$;

export const acquisition_task_workitem_code_sequence: Item$;

export const acquisition_subtask_sequence: Item$;

export const subtask_workitem_code_sequence: Item$;

export const acquisition_task_index: Item$;

export const acquisition_subtask_index: Item$;

export const referenced_baseline_parameters_rt_radiation_instance_sequence: Item$;

export const position_acquisition_template_identification_sequence: Item$;

export const position_acquisition_template_id: Item$;

export const position_acquisition_template_name: Item$;

export const position_acquisition_template_code_sequence: Item$;

export const position_acquisition_template_description: Item$;

export const acquisition_task_applicability_sequence: Item$;

export const projection_imaging_acquisition_parameter_sequence: Item$;

export const ct_imaging_acquisition_parameter_sequence: Item$;

export const kv_imaging_generation_parameters_sequence: Item$;

export const mv_imaging_generation_parameters_sequence: Item$;

export const acquisition_signal_type: Item$;

export const acquisition_method: Item$;

export const scan_start_position_sequence: Item$;

export const scan_stop_position_sequence: Item$;

export const imaging_source_to_beam_modifier_definition_plane_distance: Item$;

export const scan_arc_type: Item$;

export const detector_positioning_type: Item$;

export const additional_rt_accessory_device_sequence: Item$;

export const device_specific_acquisition_parameter_sequence: Item$;

export const referenced_position_reference_instance_sequence: Item$;

export const energy_derivation_code_sequence: Item$;

export const maximum_cumulative_meterset_exposure: Item$;

export const acquisition_initiation_sequence: Item$;

export const dvh_type: Item$;

export const dose_units: Item$;

export const dose_type: Item$;

export const spatial_transform_of_dose: Item$;

export const dose_comment: Item$;

export const normalization_point: Item$;

export const dose_summation_type: Item$;

export const grid_frame_offset_vector: Item$;

export const dose_grid_scaling: Item$;

export const rt_dose_roi_sequence: Item$;

export const dose_value: Item$;

export const tissue_heterogeneity_correction: Item$;

export const dvh_normalization_point: Item$;

export const dvh_normalization_dose_value: Item$;

export const dvh_sequence: Item$;

export const dvh_dose_scaling: Item$;

export const dvh_volume_units: Item$;

export const dvh_number_of_bins: Item$;

export const dvh_data: Item$;

export const dvh_referenced_roi_sequence: Item$;

export const dvh_roi_contribution_type: Item$;

export const dvh_minimum_dose: Item$;

export const dvh_maximum_dose: Item$;

export const dvh_mean_dose: Item$;

export const structure_set_label: Item$;

export const structure_set_name: Item$;

export const structure_set_description: Item$;

export const structure_set_date: Item$;

export const structure_set_time: Item$;

export const referenced_frame_of_reference_sequence: Item$;

export const rt_referenced_study_sequence: Item$;

export const rt_referenced_series_sequence: Item$;

export const contour_image_sequence: Item$;

export const predecessor_structure_set_sequence: Item$;

export const structure_set_roi_sequence: Item$;

export const roi_number: Item$;

export const referenced_frame_of_reference_uid: Item$;

export const roi_name: Item$;

export const roi_description: Item$;

export const roi_display_color: Item$;

export const roi_volume: Item$;

export const roi_date_time: Item$;

export const roi_observation_date_time: Item$;

export const rt_related_roi_sequence: Item$;

export const rtroi_relationship: Item$;

export const roi_generation_algorithm: Item$;

export const roi_derivation_algorithm_identification_sequence: Item$;

export const roi_generation_description: Item$;

export const roi_contour_sequence: Item$;

export const contour_sequence: Item$;

export const contour_geometric_type: Item$;

export const contour_slab_thickness: Item$;

export const contour_offset_vector: Item$;

export const number_of_contour_points: Item$;

export const contour_number: Item$;

export const attached_contours: Item$;

export const source_pixel_planes_characteristics_sequence: Item$;

export const source_series_sequence: Item$;

export const source_series_information_sequence: Item$;

export const roi_creator_sequence: Item$;

export const roi_interpreter_sequence: Item$;

export const roi_observation_context_code_sequence: Item$;

export const contour_data: Item$;

export const rtroi_observations_sequence: Item$;

export const observation_number: Item$;

export const referenced_roi_number: Item$;

export const roi_observation_label: Item$;

export const rtroi_identification_code_sequence: Item$;

export const roi_observation_description: Item$;

export const related_rtroi_observations_sequence: Item$;

export const rtroi_interpreted_type: Item$;

export const roi_interpreter: Item$;

export const roi_physical_properties_sequence: Item$;

export const roi_physical_property: Item$;

export const roi_physical_property_value: Item$;

export const roi_elemental_composition_sequence: Item$;

export const roi_elemental_composition_atomic_number: Item$;

export const roi_elemental_composition_atomic_mass_fraction: Item$;

export const additional_rtroi_identification_code_sequence: Item$;

export const frame_of_reference_relationship_sequence: Item$;

export const related_frame_of_reference_uid: Item$;

export const frame_of_reference_transformation_type: Item$;

export const frame_of_reference_transformation_matrix: Item$;

export const frame_of_reference_transformation_comment: Item$;

export const patient_location_coordinates_sequence: Item$;

export const patient_location_coordinates_code_sequence: Item$;

export const patient_support_position_sequence: Item$;

export const measured_dose_reference_sequence: Item$;

export const measured_dose_description: Item$;

export const measured_dose_type: Item$;

export const measured_dose_value: Item$;

export const treatment_session_beam_sequence: Item$;

export const treatment_session_ion_beam_sequence: Item$;

export const current_fraction_number: Item$;

export const treatment_control_point_date: Item$;

export const treatment_control_point_time: Item$;

export const treatment_termination_status: Item$;

export const treatment_termination_code: Item$;

export const treatment_verification_status: Item$;

export const referenced_treatment_record_sequence: Item$;

export const specified_primary_meterset: Item$;

export const specified_secondary_meterset: Item$;

export const delivered_primary_meterset: Item$;

export const delivered_secondary_meterset: Item$;

export const specified_treatment_time: Item$;

export const delivered_treatment_time: Item$;

export const control_point_delivery_sequence: Item$;

export const ion_control_point_delivery_sequence: Item$;

export const specified_meterset: Item$;

export const delivered_meterset: Item$;

export const meterset_rate_set: Item$;

export const meterset_rate_delivered: Item$;

export const scan_spot_metersets_delivered: Item$;

export const dose_rate_delivered: Item$;

export const treatment_summary_calculated_dose_reference_sequence: Item$;

export const cumulative_dose_to_dose_reference: Item$;

export const first_treatment_date: Item$;

export const most_recent_treatment_date: Item$;

export const number_of_fractions_delivered: Item$;

export const override_sequence: Item$;

export const parameter_sequence_pointer: Item$;

export const override_parameter_pointer: Item$;

export const parameter_item_index: Item$;

export const measured_dose_reference_number: Item$;

export const parameter_pointer: Item$;

export const override_reason: Item$;

export const parameter_value_number: Item$;

export const corrected_parameter_sequence: Item$;

export const correction_value: Item$;

export const calculated_dose_reference_sequence: Item$;

export const calculated_dose_reference_number: Item$;

export const calculated_dose_reference_description: Item$;

export const calculated_dose_reference_dose_value: Item$;

export const start_meterset: Item$;

export const end_meterset: Item$;

export const referenced_measured_dose_reference_sequence: Item$;

export const referenced_measured_dose_reference_number: Item$;

export const referenced_calculated_dose_reference_sequence: Item$;

export const referenced_calculated_dose_reference_number: Item$;

export const beam_limiting_device_leaf_pairs_sequence: Item$;

export const enhanced_rt_beam_limiting_device_sequence: Item$;

export const enhanced_rt_beam_limiting_opening_sequence: Item$;

export const enhanced_rt_beam_limiting_device_definition_flag: Item$;

export const parallel_rt_beam_delimiter_opening_extents: Item$;

export const recorded_wedge_sequence: Item$;

export const recorded_compensator_sequence: Item$;

export const recorded_block_sequence: Item$;

export const recorded_block_slab_sequence: Item$;

export const treatment_summary_measured_dose_reference_sequence: Item$;

export const recorded_snout_sequence: Item$;

export const recorded_range_shifter_sequence: Item$;

export const recorded_lateral_spreading_device_sequence: Item$;

export const recorded_range_modulator_sequence: Item$;

export const recorded_source_sequence: Item$;

export const source_serial_number: Item$;

export const treatment_session_application_setup_sequence: Item$;

export const application_setup_check: Item$;

export const recorded_brachy_accessory_device_sequence: Item$;

export const referenced_brachy_accessory_device_number: Item$;

export const recorded_channel_sequence: Item$;

export const specified_channel_total_time: Item$;

export const delivered_channel_total_time: Item$;

export const specified_number_of_pulses: Item$;

export const delivered_number_of_pulses: Item$;

export const specified_pulse_repetition_interval: Item$;

export const delivered_pulse_repetition_interval: Item$;

export const recorded_source_applicator_sequence: Item$;

export const referenced_source_applicator_number: Item$;

export const recorded_channel_shield_sequence: Item$;

export const referenced_channel_shield_number: Item$;

export const brachy_control_point_delivered_sequence: Item$;

export const safe_position_exit_date: Item$;

export const safe_position_exit_time: Item$;

export const safe_position_return_date: Item$;

export const safe_position_return_time: Item$;

export const pulse_specific_brachy_control_point_delivered_sequence: Item$;

export const pulse_number: Item$;

export const brachy_pulse_control_point_delivered_sequence: Item$;

export const current_treatment_status: Item$;

export const treatment_status_comment: Item$;

export const fraction_group_summary_sequence: Item$;

export const referenced_fraction_number: Item$;

export const fraction_group_type: Item$;

export const beam_stopper_position: Item$;

export const fraction_status_summary_sequence: Item$;

export const treatment_date: Item$;

export const treatment_time: Item$;

export const rt_plan_label: Item$;

export const rt_plan_name: Item$;

export const rt_plan_description: Item$;

export const rt_plan_date: Item$;

export const rt_plan_time: Item$;

export const treatment_protocols: Item$;

export const plan_intent: Item$;

export const treatment_sites: Item$;

export const rt_plan_geometry: Item$;

export const prescription_description: Item$;

export const dose_reference_sequence: Item$;

export const dose_reference_number: Item$;

export const dose_reference_uid: Item$;

export const dose_reference_structure_type: Item$;

export const nominal_beam_energy_unit: Item$;

export const dose_reference_description: Item$;

export const dose_reference_point_coordinates: Item$;

export const nominal_prior_dose: Item$;

export const dose_reference_type: Item$;

export const constraint_weight: Item$;

export const delivery_warning_dose: Item$;

export const delivery_maximum_dose: Item$;

export const target_minimum_dose: Item$;

export const target_prescription_dose: Item$;

export const target_maximum_dose: Item$;

export const target_underdose_volume_fraction: Item$;

export const organ_at_risk_full_volume_dose: Item$;

export const organ_at_risk_limit_dose: Item$;

export const organ_at_risk_maximum_dose: Item$;

export const organ_at_risk_overdose_volume_fraction: Item$;

export const tolerance_table_sequence: Item$;

export const tolerance_table_number: Item$;

export const tolerance_table_label: Item$;

export const gantry_angle_tolerance: Item$;

export const beam_limiting_device_angle_tolerance: Item$;

export const beam_limiting_device_tolerance_sequence: Item$;

export const beam_limiting_device_position_tolerance: Item$;

export const snout_position_tolerance: Item$;

export const patient_support_angle_tolerance: Item$;

export const table_top_eccentric_angle_tolerance: Item$;

export const table_top_pitch_angle_tolerance: Item$;

export const table_top_roll_angle_tolerance: Item$;

export const table_top_vertical_position_tolerance: Item$;

export const table_top_longitudinal_position_tolerance: Item$;

export const table_top_lateral_position_tolerance: Item$;

export const rt_plan_relationship: Item$;

export const fraction_group_sequence: Item$;

export const fraction_group_number: Item$;

export const fraction_group_description: Item$;

export const number_of_fractions_planned: Item$;

export const number_of_fraction_pattern_digits_per_day: Item$;

export const repeat_fraction_cycle_length: Item$;

export const fraction_pattern: Item$;

export const number_of_beams: Item$;

export const beam_dose_specification_point: Item$;

export const referenced_dose_reference_uid: Item$;

export const beam_dose: Item$;

export const beam_meterset: Item$;

export const beam_dose_point_depth: Item$;

export const beam_dose_point_equivalent_depth: Item$;

export const beam_dose_point_ssd: Item$;

export const beam_dose_meaning: Item$;

export const beam_dose_verification_control_point_sequence: Item$;

export const average_beam_dose_point_depth: Item$;

export const average_beam_dose_point_equivalent_depth: Item$;

export const average_beam_dose_point_ssd: Item$;

export const beam_dose_type: Item$;

export const alternate_beam_dose: Item$;

export const alternate_beam_dose_type: Item$;

export const depth_value_averaging_flag: Item$;

export const beam_dose_point_source_to_external_contour_distance: Item$;

export const number_of_brachy_application_setups: Item$;

export const brachy_application_setup_dose_specification_point: Item$;

export const brachy_application_setup_dose: Item$;

export const beam_sequence: Item$;

export const treatment_machine_name: Item$;

export const primary_dosimeter_unit: Item$;

export const source_axis_distance: Item$;

export const beam_limiting_device_sequence: Item$;

export const rt_beam_limiting_device_type: Item$;

export const source_to_beam_limiting_device_distance: Item$;

export const isocenter_to_beam_limiting_device_distance: Item$;

export const number_of_leaf_jaw_pairs: Item$;

export const leaf_position_boundaries: Item$;

export const beam_number: Item$;

export const beam_name: Item$;

export const beam_description: Item$;

export const beam_type: Item$;

export const beam_delivery_duration_limit: Item$;

export const radiation_type: Item$;

export const high_dose_technique_type: Item$;

export const reference_image_number: Item$;

export const planned_verification_image_sequence: Item$;

export const imaging_device_specific_acquisition_parameters: Item$;

export const treatment_delivery_type: Item$;

export const number_of_wedges: Item$;

export const wedge_sequence: Item$;

export const wedge_number: Item$;

export const wedge_type: Item$;

export const wedge_id: Item$;

export const wedge_angle: Item$;

export const wedge_factor: Item$;

export const total_wedge_tray_water_equivalent_thickness: Item$;

export const wedge_orientation: Item$;

export const isocenter_to_wedge_tray_distance: Item$;

export const source_to_wedge_tray_distance: Item$;

export const wedge_thin_edge_position: Item$;

export const bolus_id: Item$;

export const bolus_description: Item$;

export const effective_wedge_angle: Item$;

export const number_of_compensators: Item$;

export const material_id: Item$;

export const total_compensator_tray_factor: Item$;

export const compensator_sequence: Item$;

export const compensator_number: Item$;

export const compensator_id: Item$;

export const source_to_compensator_tray_distance: Item$;

export const compensator_rows: Item$;

export const compensator_columns: Item$;

export const compensator_pixel_spacing: Item$;

export const compensator_position: Item$;

export const compensator_transmission_data: Item$;

export const compensator_thickness_data: Item$;

export const number_of_boli: Item$;

export const compensator_type: Item$;

export const compensator_tray_id: Item$;

export const number_of_blocks: Item$;

export const total_block_tray_factor: Item$;

export const total_block_tray_water_equivalent_thickness: Item$;

export const block_sequence: Item$;

export const block_tray_id: Item$;

export const source_to_block_tray_distance: Item$;

export const isocenter_to_block_tray_distance: Item$;

export const block_type: Item$;

export const accessory_code: Item$;

export const block_divergence: Item$;

export const block_mounting_position: Item$;

export const block_number: Item$;

export const block_name: Item$;

export const block_thickness: Item$;

export const block_transmission: Item$;

export const block_number_of_points: Item$;

export const block_data: Item$;

export const applicator_sequence: Item$;

export const applicator_id: Item$;

export const applicator_type: Item$;

export const applicator_description: Item$;

export const cumulative_dose_reference_coefficient: Item$;

export const final_cumulative_meterset_weight: Item$;

export const number_of_control_points: Item$;

export const control_point_sequence: Item$;

export const control_point_index: Item$;

export const nominal_beam_energy: Item$;

export const dose_rate_set: Item$;

export const wedge_position_sequence: Item$;

export const wedge_position: Item$;

export const beam_limiting_device_position_sequence: Item$;

export const leaf_jaw_positions: Item$;

export const gantry_angle: Item$;

export const gantry_rotation_direction: Item$;

export const beam_limiting_device_angle: Item$;

export const beam_limiting_device_rotation_direction: Item$;

export const patient_support_angle: Item$;

export const patient_support_rotation_direction: Item$;

export const table_top_eccentric_axis_distance: Item$;

export const table_top_eccentric_angle: Item$;

export const table_top_eccentric_rotation_direction: Item$;

export const table_top_vertical_position: Item$;

export const table_top_longitudinal_position: Item$;

export const table_top_lateral_position: Item$;

export const isocenter_position: Item$;

export const surface_entry_point: Item$;

export const source_to_surface_distance: Item$;

export const average_beam_dose_point_source_to_external_contour_distance: Item$;

export const source_to_external_contour_distance: Item$;

export const external_contour_entry_point: Item$;

export const cumulative_meterset_weight: Item$;

export const table_top_pitch_angle: Item$;

export const table_top_pitch_rotation_direction: Item$;

export const table_top_roll_angle: Item$;

export const table_top_roll_rotation_direction: Item$;

export const head_fixation_angle: Item$;

export const gantry_pitch_angle: Item$;

export const gantry_pitch_rotation_direction: Item$;

export const gantry_pitch_angle_tolerance: Item$;

export const fixation_eye: Item$;

export const chair_head_frame_position: Item$;

export const head_fixation_angle_tolerance: Item$;

export const chair_head_frame_position_tolerance: Item$;

export const fixation_light_azimuthal_angle_tolerance: Item$;

export const fixation_light_polar_angle_tolerance: Item$;

export const patient_setup_sequence: Item$;

export const patient_setup_number: Item$;

export const patient_setup_label: Item$;

export const patient_additional_position: Item$;

export const fixation_device_sequence: Item$;

export const fixation_device_type: Item$;

export const fixation_device_label: Item$;

export const fixation_device_description: Item$;

export const fixation_device_position: Item$;

export const fixation_device_pitch_angle: Item$;

export const fixation_device_roll_angle: Item$;

export const shielding_device_sequence: Item$;

export const shielding_device_type: Item$;

export const shielding_device_label: Item$;

export const shielding_device_description: Item$;

export const shielding_device_position: Item$;

export const setup_technique: Item$;

export const setup_technique_description: Item$;

export const setup_device_sequence: Item$;

export const setup_device_type: Item$;

export const setup_device_label: Item$;

export const setup_device_description: Item$;

export const setup_device_parameter: Item$;

export const setup_reference_description: Item$;

export const table_top_vertical_setup_displacement: Item$;

export const table_top_longitudinal_setup_displacement: Item$;

export const table_top_lateral_setup_displacement: Item$;

export const brachy_treatment_technique: Item$;

export const brachy_treatment_type: Item$;

export const treatment_machine_sequence: Item$;

export const source_sequence: Item$;

export const source_number: Item$;

export const source_type: Item$;

export const source_manufacturer: Item$;

export const active_source_diameter: Item$;

export const active_source_length: Item$;

export const source_model_id: Item$;

export const source_description: Item$;

export const source_encapsulation_nominal_thickness: Item$;

export const source_encapsulation_nominal_transmission: Item$;

export const source_isotope_name: Item$;

export const source_isotope_half_life: Item$;

export const source_strength_units: Item$;

export const reference_air_kerma_rate: Item$;

export const source_strength: Item$;

export const source_strength_reference_date: Item$;

export const source_strength_reference_time: Item$;

export const application_setup_sequence: Item$;

export const application_setup_type: Item$;

export const application_setup_number: Item$;

export const application_setup_name: Item$;

export const application_setup_manufacturer: Item$;

export const template_number: Item$;

export const template_type: Item$;

export const template_name: Item$;

export const total_reference_air_kerma: Item$;

export const brachy_accessory_device_sequence: Item$;

export const brachy_accessory_device_number: Item$;

export const brachy_accessory_device_id: Item$;

export const brachy_accessory_device_type: Item$;

export const brachy_accessory_device_name: Item$;

export const brachy_accessory_device_nominal_thickness: Item$;

export const brachy_accessory_device_nominal_transmission: Item$;

export const channel_effective_length: Item$;

export const channel_inner_length: Item$;

export const afterloader_channel_id: Item$;

export const source_applicator_tip_length: Item$;

export const channel_sequence: Item$;

export const channel_number: Item$;

export const channel_length: Item$;

export const channel_total_time: Item$;

export const source_movement_type: Item$;

export const number_of_pulses: Item$;

export const pulse_repetition_interval: Item$;

export const source_applicator_number: Item$;

export const source_applicator_id: Item$;

export const source_applicator_type: Item$;

export const source_applicator_name: Item$;

export const source_applicator_length: Item$;

export const source_applicator_manufacturer: Item$;

export const source_applicator_wall_nominal_thickness: Item$;

export const source_applicator_wall_nominal_transmission: Item$;

export const source_applicator_step_size: Item$;

export const applicator_shape_referenced_roi_number: Item$;

export const transfer_tube_number: Item$;

export const transfer_tube_length: Item$;

export const channel_shield_sequence: Item$;

export const channel_shield_number: Item$;

export const channel_shield_id: Item$;

export const channel_shield_name: Item$;

export const channel_shield_nominal_thickness: Item$;

export const channel_shield_nominal_transmission: Item$;

export const final_cumulative_time_weight: Item$;

export const brachy_control_point_sequence: Item$;

export const control_point_relative_position: Item$;

export const control_point_3d_position: Item$;

export const cumulative_time_weight: Item$;

export const compensator_divergence: Item$;

export const compensator_mounting_position: Item$;

export const source_to_compensator_distance: Item$;

export const total_compensator_tray_water_equivalent_thickness: Item$;

export const isocenter_to_compensator_tray_distance: Item$;

export const compensator_column_offset: Item$;

export const isocenter_to_compensator_distances: Item$;

export const compensator_relative_stopping_power_ratio: Item$;

export const compensator_milling_tool_diameter: Item$;

export const ion_range_compensator_sequence: Item$;

export const compensator_description: Item$;

export const radiation_mass_number: Item$;

export const radiation_atomic_number: Item$;

export const radiation_charge_state: Item$;

export const scan_mode: Item$;

export const modulated_scan_mode_type: Item$;

export const virtual_source_axis_distances: Item$;

export const snout_sequence: Item$;

export const snout_position: Item$;

export const snout_id: Item$;

export const number_of_range_shifters: Item$;

export const range_shifter_sequence: Item$;

export const range_shifter_number: Item$;

export const range_shifter_id: Item$;

export const range_shifter_type: Item$;

export const range_shifter_description: Item$;

export const number_of_lateral_spreading_devices: Item$;

export const lateral_spreading_device_sequence: Item$;

export const lateral_spreading_device_number: Item$;

export const lateral_spreading_device_id: Item$;

export const lateral_spreading_device_type: Item$;

export const lateral_spreading_device_description: Item$;

export const lateral_spreading_device_water_equivalent_thickness: Item$;

export const number_of_range_modulators: Item$;

export const range_modulator_sequence: Item$;

export const range_modulator_number: Item$;

export const range_modulator_id: Item$;

export const range_modulator_type: Item$;

export const range_modulator_description: Item$;

export const beam_current_modulation_id: Item$;

export const patient_support_type: Item$;

export const patient_support_id: Item$;

export const patient_support_accessory_code: Item$;

export const tray_accessory_code: Item$;

export const fixation_light_azimuthal_angle: Item$;

export const fixation_light_polar_angle: Item$;

export const meterset_rate: Item$;

export const range_shifter_settings_sequence: Item$;

export const range_shifter_setting: Item$;

export const isocenter_to_range_shifter_distance: Item$;

export const range_shifter_water_equivalent_thickness: Item$;

export const lateral_spreading_device_settings_sequence: Item$;

export const lateral_spreading_device_setting: Item$;

export const isocenter_to_lateral_spreading_device_distance: Item$;

export const range_modulator_settings_sequence: Item$;

export const range_modulator_gating_start_value: Item$;

export const range_modulator_gating_stop_value: Item$;

export const range_modulator_gating_start_water_equivalent_thickness: Item$;

export const range_modulator_gating_stop_water_equivalent_thickness: Item$;

export const isocenter_to_range_modulator_distance: Item$;

export const scan_spot_time_offset: Item$;

export const scan_spot_tune_id: Item$;

export const scan_spot_prescribed_indices: Item$;

export const number_of_scan_spot_positions: Item$;

export const scan_spot_reordered: Item$;

export const scan_spot_position_map: Item$;

export const scan_spot_reordering_allowed: Item$;

export const scan_spot_meterset_weights: Item$;

export const scanning_spot_size: Item$;

export const scan_spot_sizes_delivered: Item$;

export const number_of_paintings: Item$;

export const ion_tolerance_table_sequence: Item$;

export const ion_beam_sequence: Item$;

export const ion_beam_limiting_device_sequence: Item$;

export const ion_block_sequence: Item$;

export const ion_control_point_sequence: Item$;

export const ion_wedge_sequence: Item$;

export const ion_wedge_position_sequence: Item$;

export const referenced_setup_image_sequence: Item$;

export const setup_image_comment: Item$;

export const motion_synchronization_sequence: Item$;

export const control_point_orientation: Item$;

export const general_accessory_sequence: Item$;

export const general_accessory_id: Item$;

export const general_accessory_description: Item$;

export const general_accessory_type: Item$;

export const general_accessory_number: Item$;

export const source_to_general_accessory_distance: Item$;

export const isocenter_to_general_accessory_distance: Item$;

export const applicator_geometry_sequence: Item$;

export const applicator_aperture_shape: Item$;

export const applicator_opening: Item$;

export const applicator_opening_x: Item$;

export const applicator_opening_y: Item$;

export const source_to_applicator_mounting_position_distance: Item$;

export const number_of_block_slab_items: Item$;

export const block_slab_sequence: Item$;

export const block_slab_thickness: Item$;

export const block_slab_number: Item$;

export const device_motion_control_sequence: Item$;

export const device_motion_execution_mode: Item$;

export const device_motion_observation_mode: Item$;

export const device_motion_parameter_code_sequence: Item$;

export const distal_depth_fraction: Item$;

export const distal_depth: Item$;

export const nominal_range_modulation_fractions: Item$;

export const nominal_range_modulated_region_depths: Item$;

export const depth_dose_parameters_sequence: Item$;

export const delivered_depth_dose_parameters_sequence: Item$;

export const delivered_distal_depth_fraction: Item$;

export const delivered_distal_depth: Item$;

export const delivered_nominal_range_modulation_fractions: Item$;

export const delivered_nominal_range_modulated_region_depths: Item$;

export const delivered_reference_dose_definition: Item$;

export const reference_dose_definition: Item$;

export const rt_control_point_index: Item$;

export const radiation_generation_mode_index: Item$;

export const referenced_defined_device_index: Item$;

export const radiation_dose_identification_index: Item$;

export const number_of_rt_control_points: Item$;

export const referenced_radiation_generation_mode_index: Item$;

export const treatment_position_index: Item$;

export const referenced_device_index: Item$;

export const treatment_position_group_label: Item$;

export const treatment_position_group_uid: Item$;

export const treatment_position_group_sequence: Item$;

export const referenced_treatment_position_index: Item$;

export const referenced_radiation_dose_identification_index: Item$;

export const rt_accessory_holder_water_equivalent_thickness: Item$;

export const referenced_rt_accessory_holder_device_index: Item$;

export const rt_accessory_holder_slot_existence_flag: Item$;

export const rt_accessory_holder_slot_sequence: Item$;

export const rt_accessory_holder_slot_id: Item$;

export const rt_accessory_holder_slot_distance: Item$;

export const rt_accessory_slot_distance: Item$;

export const rt_accessory_holder_definition_sequence: Item$;

export const rt_accessory_device_slot_id: Item$;

export const rt_radiation_sequence: Item$;

export const radiation_dose_sequence: Item$;

export const radiation_dose_identification_sequence: Item$;

export const radiation_dose_identification_label: Item$;

export const reference_dose_type: Item$;

export const primary_dose_value_indicator: Item$;

export const dose_values_sequence: Item$;

export const dose_value_purpose: Item$;

export const reference_dose_point_coordinates: Item$;

export const radiation_dose_values_parameters_sequence: Item$;

export const meterset_to_dose_mapping_sequence: Item$;

export const expected_in_vivo_measurement_values_sequence: Item$;

export const expected_in_vivo_measurement_value_index: Item$;

export const radiation_dose_in_vivo_measurement_label: Item$;

export const radiation_dose_central_axis_displacement: Item$;

export const radiation_dose_value: Item$;

export const radiation_dose_source_to_skin_distance: Item$;

export const radiation_dose_measurement_point_coordinates: Item$;

export const radiation_dose_source_to_external_contour_distance: Item$;

export const rt_tolerance_set_sequence: Item$;

export const rt_tolerance_set_label: Item$;

export const attribute_tolerance_values_sequence: Item$;

export const tolerance_value: Item$;

export const patient_support_position_tolerance_sequence: Item$;

export const treatment_time_limit: Item$;

export const c_arm_photon_electron_control_point_sequence: Item$;

export const referenced_rt_radiation_sequence: Item$;

export const referenced_rt_instance_sequence: Item$;

export const referenced_rt_patient_setup_sequence: Item$;

export const source_to_patient_surface_distance: Item$;

export const treatment_machine_special_mode_code_sequence: Item$;

export const intended_number_of_fractions: Item$;

export const rt_radiation_set_intent: Item$;

export const rt_radiation_physical_and_geometric_content_detail_flag: Item$;

export const rt_record_flag: Item$;

export const treatment_device_identification_sequence: Item$;

export const referenced_rt_physician_intent_sequence: Item$;

export const cumulative_meterset: Item$;

export const delivery_rate: Item$;

export const delivery_rate_unit_sequence: Item$;

export const treatment_position_sequence: Item$;

export const radiation_source_axis_distance: Item$;

export const number_of_rt_beam_limiting_devices: Item$;

export const rt_beam_limiting_device_proximal_distance: Item$;

export const rt_beam_limiting_device_distal_distance: Item$;

export const parallel_rt_beam_delimiter_device_orientation_label_code_sequence: Item$;

export const beam_modifier_orientation_angle: Item$;

export const fixed_rt_beam_delimiter_device_sequence: Item$;

export const parallel_rt_beam_delimiter_device_sequence: Item$;

export const number_of_parallel_rt_beam_delimiters: Item$;

export const parallel_rt_beam_delimiter_boundaries: Item$;

export const parallel_rt_beam_delimiter_positions: Item$;

export const rt_beam_limiting_device_offset: Item$;

export const rt_beam_delimiter_geometry_sequence: Item$;

export const rt_beam_limiting_device_definition_sequence: Item$;

export const parallel_rt_beam_delimiter_opening_mode: Item$;

export const parallel_rt_beam_delimiter_leaf_mounting_side: Item$;

export const patient_setup_uid: Item$;

export const wedge_definition_sequence: Item$;

export const radiation_beam_wedge_angle: Item$;

export const radiation_beam_wedge_thin_edge_distance: Item$;

export const radiation_beam_effective_wedge_angle: Item$;

export const number_of_wedge_positions: Item$;

export const rt_beam_limiting_device_opening_sequence: Item$;

export const number_of_rt_beam_limiting_device_openings: Item$;

export const radiation_dosimeter_unit_sequence: Item$;

export const rt_device_distance_reference_location_code_sequence: Item$;

export const radiation_device_configuration_and_commissioning_key_sequence: Item$;

export const patient_support_position_parameter_sequence: Item$;

export const patient_support_position_specification_method: Item$;

export const patient_support_position_device_parameter_sequence: Item$;

export const device_order_index: Item$;

export const patient_support_position_parameter_order_index: Item$;

export const patient_support_position_device_tolerance_sequence: Item$;

export const patient_support_position_tolerance_order_index: Item$;

export const compensator_definition_sequence: Item$;

export const compensator_map_orientation: Item$;

export const compensator_proximal_thickness_map: Item$;

export const compensator_distal_thickness_map: Item$;

export const compensator_base_plane_offset: Item$;

export const compensator_shape_fabrication_code_sequence: Item$;

export const compensator_shape_sequence: Item$;

export const radiation_beam_compensator_milling_tool_diameter: Item$;

export const block_definition_sequence: Item$;

export const block_edge_data: Item$;

export const block_orientation: Item$;

export const radiation_beam_block_thickness: Item$;

export const radiation_beam_block_slab_thickness: Item$;

export const block_edge_data_sequence: Item$;

export const number_of_rt_accessory_holders: Item$;

export const general_accessory_definition_sequence: Item$;

export const number_of_general_accessories: Item$;

export const bolus_definition_sequence: Item$;

export const number_of_boluses: Item$;

export const equipment_frame_of_reference_uid: Item$;

export const equipment_frame_of_reference_description: Item$;

export const equipment_reference_point_coordinates_sequence: Item$;

export const equipment_reference_point_code_sequence: Item$;

export const rt_beam_limiting_device_angle: Item$;

export const source_roll_angle: Item$;

export const radiation_generation_mode_sequence: Item$;

export const radiation_generation_mode_label: Item$;

export const radiation_generation_mode_description: Item$;

export const radiation_generation_mode_machine_code_sequence: Item$;

export const radiation_type_code_sequence: Item$;

export const nominal_energy: Item$;

export const minimum_nominal_energy: Item$;

export const maximum_nominal_energy: Item$;

export const radiation_fluence_modifier_code_sequence: Item$;

export const energy_unit_code_sequence: Item$;

export const number_of_radiation_generation_modes: Item$;

export const patient_support_devices_sequence: Item$;

export const number_of_patient_support_devices: Item$;

export const rt_beam_modifier_definition_distance: Item$;

export const beam_area_limit_sequence: Item$;

export const referenced_rt_prescription_sequence: Item$;

export const dose_value_interpretation: Item$;

export const treatment_session_uid: Item$;

export const rt_radiation_usage: Item$;

export const referenced_rt_radiation_set_sequence: Item$;

export const referenced_rt_radiation_record_sequence: Item$;

export const rt_radiation_set_delivery_number: Item$;

export const clinical_fraction_number: Item$;

export const rt_treatment_fraction_completion_status: Item$;

export const rt_radiation_set_usage: Item$;

export const treatment_delivery_continuation_flag: Item$;

export const treatment_record_content_origin: Item$;

export const rt_treatment_termination_status: Item$;

export const rt_treatment_termination_reason_code_sequence: Item$;

export const machine_specific_treatment_termination_code_sequence: Item$;

export const rt_radiation_salvage_record_control_point_sequence: Item$;

export const starting_meterset_value_known_flag: Item$;

export const treatment_termination_description: Item$;

export const treatment_tolerance_violation_sequence: Item$;

export const treatment_tolerance_violation_category: Item$;

export const treatment_tolerance_violation_attribute_sequence: Item$;

export const treatment_tolerance_violation_description: Item$;

export const treatment_tolerance_violation_identification: Item$;

export const treatment_tolerance_violation_date_time: Item$;

export const recorded_rt_control_point_date_time: Item$;

export const referenced_radiation_rt_control_point_index: Item$;

export const alternate_value_sequence: Item$;

export const confirmation_sequence: Item$;

export const interlock_sequence: Item$;

export const interlock_date_time: Item$;

export const interlock_description: Item$;

export const interlock_originating_device_sequence: Item$;

export const interlock_code_sequence: Item$;

export const interlock_resolution_code_sequence: Item$;

export const interlock_resolution_user_sequence: Item$;

export const override_date_time: Item$;

export const treatment_tolerance_violation_type_code_sequence: Item$;

export const treatment_tolerance_violation_cause_code_sequence: Item$;

export const measured_meterset_to_dose_mapping_sequence: Item$;

export const referenced_expected_in_vivo_measurement_value_index: Item$;

export const dose_measurement_device_code_sequence: Item$;

export const additional_parameter_recording_instance_sequence: Item$;

export const interlock_origin_description: Item$;

export const rt_patient_position_scope_sequence: Item$;

export const referenced_treatment_position_group_uid: Item$;

export const radiation_order_index: Item$;

export const omitted_radiation_sequence: Item$;

export const reason_for_omission_code_sequence: Item$;

export const rt_delivery_start_patient_position_sequence: Item$;

export const rt_treatment_preparation_patient_position_sequence: Item$;

export const referenced_rt_treatment_preparation_sequence: Item$;

export const referenced_patient_setup_photo_sequence: Item$;

export const patient_treatment_preparation_method_code_sequence: Item$;

export const patient_treatment_preparation_procedure_parameter_description: Item$;

export const patient_treatment_preparation_device_sequence: Item$;

export const patient_treatment_preparation_procedure_sequence: Item$;

export const patient_treatment_preparation_procedure_code_sequence: Item$;

export const patient_treatment_preparation_method_description: Item$;

export const patient_treatment_preparation_procedure_parameter_sequence: Item$;

export const patient_setup_photo_description: Item$;

export const patient_treatment_preparation_procedure_index: Item$;

export const referenced_patient_setup_procedure_index: Item$;

export const rt_radiation_task_sequence: Item$;

export const rt_patient_position_displacement_sequence: Item$;

export const rt_patient_position_sequence: Item$;

export const displacement_reference_label: Item$;

export const displacement_matrix: Item$;

export const patient_support_displacement_sequence: Item$;

export const displacement_reference_location_code_sequence: Item$;

export const rt_radiation_set_delivery_usage: Item$;

export const referenced_rt_plan_sequence: Item$;

export const referenced_beam_sequence: Item$;

export const referenced_beam_number: Item$;

export const referenced_reference_image_number: Item$;

export const start_cumulative_meterset_weight: Item$;

export const end_cumulative_meterset_weight: Item$;

export const referenced_brachy_application_setup_sequence: Item$;

export const referenced_brachy_application_setup_number: Item$;

export const referenced_source_number: Item$;

export const referenced_fraction_group_sequence: Item$;

export const referenced_fraction_group_number: Item$;

export const referenced_verification_image_sequence: Item$;

export const referenced_reference_image_sequence: Item$;

export const referenced_dose_reference_sequence: Item$;

export const referenced_dose_reference_number: Item$;

export const brachy_referenced_dose_reference_sequence: Item$;

export const referenced_structure_set_sequence: Item$;

export const referenced_patient_setup_number: Item$;

export const referenced_dose_sequence: Item$;

export const referenced_tolerance_table_number: Item$;

export const referenced_bolus_sequence: Item$;

export const referenced_wedge_number: Item$;

export const referenced_compensator_number: Item$;

export const referenced_block_number: Item$;

export const referenced_control_point_index: Item$;

export const referenced_control_point_sequence: Item$;

export const referenced_start_control_point_index: Item$;

export const referenced_stop_control_point_index: Item$;

export const referenced_range_shifter_number: Item$;

export const referenced_lateral_spreading_device_number: Item$;

export const referenced_range_modulator_number: Item$;

export const omitted_beam_task_sequence: Item$;

export const reason_for_omission: Item$;

export const reason_for_omission_description: Item$;

export const prescription_overview_sequence: Item$;

export const total_prescription_dose: Item$;

export const plan_overview_sequence: Item$;

export const plan_overview_index: Item$;

export const referenced_plan_overview_index: Item$;

export const number_of_fractions_included: Item$;

export const dose_calibration_conditions_sequence: Item$;

export const absorbed_dose_to_meterset_ratio: Item$;

export const delineated_radiation_field_size: Item$;

export const dose_calibration_conditions_verified_flag: Item$;

export const calibration_reference_point_depth: Item$;

export const gating_beam_hold_transition_sequence: Item$;

export const beam_hold_transition: Item$;

export const beam_hold_transition_date_time: Item$;

export const beam_hold_originating_device_sequence: Item$;

export const beam_hold_transition_trigger_source: Item$;

export const approval_status: Item$;

export const review_date: Item$;

export const review_time: Item$;

export const reviewer_name: Item$;

export const radiobiological_dose_effect_sequence: Item$;

export const radiobiological_dose_effect_flag: Item$;

export const effective_dose_calculation_method_category_code_sequence: Item$;

export const effective_dose_calculation_method_code_sequence: Item$;

export const effective_dose_calculation_method_description: Item$;

export const conceptual_volume_uid: Item$;

export const originating_sop_instance_reference_sequence: Item$;

export const conceptual_volume_constituent_sequence: Item$;

export const equivalent_conceptual_volume_instance_reference_sequence: Item$;

export const equivalent_conceptual_volumes_sequence: Item$;

export const referenced_conceptual_volume_uid: Item$;

export const conceptual_volume_combination_expression: Item$;

export const conceptual_volume_constituent_index: Item$;

export const conceptual_volume_combination_flag: Item$;

export const conceptual_volume_combination_description: Item$;

export const conceptual_volume_segmentation_defined_flag: Item$;

export const conceptual_volume_segmentation_reference_sequence: Item$;

export const conceptual_volume_constituent_segmentation_reference_sequence: Item$;

export const constituent_conceptual_volume_uid: Item$;

export const derivation_conceptual_volume_sequence: Item$;

export const source_conceptual_volume_uid: Item$;

export const conceptual_volume_derivation_algorithm_sequence: Item$;

export const conceptual_volume_description: Item$;

export const source_conceptual_volume_sequence: Item$;

export const author_identification_sequence: Item$;

export const manufacturer_model_version: Item$;

export const device_alternate_identifier: Item$;

export const device_alternate_identifier_type: Item$;

export const device_alternate_identifier_format: Item$;

export const segmentation_creation_template_label: Item$;

export const segmentation_template_uid: Item$;

export const referenced_segment_reference_index: Item$;

export const segment_reference_sequence: Item$;

export const segment_reference_index: Item$;

export const direct_segment_reference_sequence: Item$;

export const combination_segment_reference_sequence: Item$;

export const conceptual_volume_sequence: Item$;

export const segmented_rt_accessory_device_sequence: Item$;

export const segment_characteristics_sequence: Item$;

export const related_segment_characteristics_sequence: Item$;

export const segment_characteristics_precedence: Item$;

export const rt_segment_annotation_sequence: Item$;

export const segment_annotation_category_code_sequence: Item$;

export const segment_annotation_type_code_sequence: Item$;

export const device_label: Item$;

export const device_type_code_sequence: Item$;

export const segment_annotation_type_modifier_code_sequence: Item$;

export const patient_equipment_relationship_code_sequence: Item$;

export const referenced_fiducials_uid: Item$;

export const patient_treatment_orientation_sequence: Item$;

export const user_content_label: Item$;

export const user_content_long_label: Item$;

export const entity_label: Item$;

export const entity_name: Item$;

export const entity_description: Item$;

export const entity_long_label: Item$;

export const device_index: Item$;

export const rt_treatment_phase_index: Item$;

export const rt_treatment_phase_uid: Item$;

export const rt_prescription_index: Item$;

export const rt_segment_annotation_index: Item$;

export const basis_rt_treatment_phase_index: Item$;

export const related_rt_treatment_phase_index: Item$;

export const referenced_rt_treatment_phase_index: Item$;

export const referenced_rt_prescription_index: Item$;

export const referenced_parent_rt_prescription_index: Item$;

export const manufacturer_device_identifier: Item$;

export const instance_level_referenced_performed_procedure_step_sequence: Item$;

export const rt_treatment_phase_intent_presence_flag: Item$;

export const radiotherapy_treatment_type: Item$;

export const teletherapy_radiation_type: Item$;

export const brachytherapy_source_type: Item$;

export const referenced_rt_treatment_phase_sequence: Item$;

export const referenced_direct_segment_instance_sequence: Item$;

export const intended_rt_treatment_phase_sequence: Item$;

export const intended_phase_start_date: Item$;

export const intended_phase_end_date: Item$;

export const rt_treatment_phase_interval_sequence: Item$;

export const temporal_relationship_interval_anchor: Item$;

export const minimum_number_of_interval_days: Item$;

export const maximum_number_of_interval_days: Item$;

export const pertinent_sop_classes_in_study: Item$;

export const pertinent_sop_classes_in_series: Item$;

export const rt_prescription_label: Item$;

export const rt_physician_intent_predecessor_sequence: Item$;

export const rt_treatment_approach_label: Item$;

export const rt_physician_intent_sequence: Item$;

export const rt_physician_intent_index: Item$;

export const rt_treatment_intent_type: Item$;

export const rt_physician_intent_narrative: Item$;

export const rt_protocol_code_sequence: Item$;

export const reason_for_superseding: Item$;

export const rt_diagnosis_code_sequence: Item$;

export const referenced_rt_physician_intent_index: Item$;

export const rt_physician_intent_input_instance_sequence: Item$;

export const rt_anatomic_prescription_sequence: Item$;

export const prior_treatment_dose_description: Item$;

export const prior_treatment_reference_sequence: Item$;

export const dosimetric_objective_evaluation_scope: Item$;

export const therapeutic_role_category_code_sequence: Item$;

export const therapeutic_role_type_code_sequence: Item$;

export const conceptual_volume_optimization_precedence: Item$;

export const conceptual_volume_category_code_sequence: Item$;

export const conceptual_volume_blocking_constraint: Item$;

export const conceptual_volume_type_code_sequence: Item$;

export const conceptual_volume_type_modifier_code_sequence: Item$;

export const rt_prescription_sequence: Item$;

export const dosimetric_objective_sequence: Item$;

export const dosimetric_objective_type_code_sequence: Item$;

export const dosimetric_objective_uid: Item$;

export const referenced_dosimetric_objective_uid: Item$;

export const dosimetric_objective_parameter_sequence: Item$;

export const referenced_dosimetric_objectives_sequence: Item$;

export const absolute_dosimetric_objective_flag: Item$;

export const dosimetric_objective_weight: Item$;

export const dosimetric_objective_purpose: Item$;

export const planning_input_information_sequence: Item$;

export const treatment_site: Item$;

export const treatment_site_code_sequence: Item$;

export const fraction_pattern_sequence: Item$;

export const treatment_technique_notes: Item$;

export const prescription_notes: Item$;

export const number_of_interval_fractions: Item$;

export const number_of_fractions: Item$;

export const intended_delivery_duration: Item$;

export const fractionation_notes: Item$;

export const rt_treatment_technique_code_sequence: Item$;

export const prescription_notes_sequence: Item$;

export const fraction_based_relationship_sequence: Item$;

export const fraction_based_relationship_interval_anchor: Item$;

export const minimum_hours_between_fractions: Item$;

export const intended_fraction_start_time: Item$;

export const intended_start_day_of_week: Item$;

export const weekday_fraction_pattern_sequence: Item$;

export const delivery_time_structure_code_sequence: Item$;

export const treatment_site_modifier_code_sequence: Item$;

export const robotic_base_location_indicator: Item$;

export const robotic_path_node_set_code_sequence: Item$;

export const robotic_node_identifier: Item$;

export const rt_treatment_source_coordinates: Item$;

export const radiation_source_coordinate_system_yaw_angle: Item$;

export const radiation_source_coordinate_system_roll_angle: Item$;

export const radiation_source_coordinate_system_pitch_angle: Item$;

export const robotic_path_control_point_sequence: Item$;

export const tomotherapeutic_control_point_sequence: Item$;

export const tomotherapeutic_leaf_open_durations: Item$;

export const tomotherapeutic_leaf_initial_closed_durations: Item$;

export const conceptual_volume_identification_sequence: Item$;

export const arbitrary: Item$;

export const text_comments: Item$;

export const results_id: Item$;

export const results_id_issuer: Item$;

export const referenced_interpretation_sequence: Item$;

export const report_production_status_trial: Item$;

export const interpretation_recorded_date: Item$;

export const interpretation_recorded_time: Item$;

export const interpretation_recorder: Item$;

export const reference_to_recorded_sound: Item$;

export const interpretation_transcription_date: Item$;

export const interpretation_transcription_time: Item$;

export const interpretation_transcriber: Item$;

export const interpretation_text: Item$;

export const interpretation_author: Item$;

export const interpretation_approver_sequence: Item$;

export const interpretation_approval_date: Item$;

export const interpretation_approval_time: Item$;

export const physician_approving_interpretation: Item$;

export const interpretation_diagnosis_description: Item$;

export const interpretation_diagnosis_code_sequence: Item$;

export const results_distribution_list_sequence: Item$;

export const distribution_name: Item$;

export const distribution_address: Item$;

export const interpretation_id: Item$;

export const interpretation_id_issuer: Item$;

export const interpretation_type_id: Item$;

export const interpretation_status_id: Item$;

export const impressions: Item$;

export const results_comments: Item$;

export const low_energy_detectors: Item$;

export const high_energy_detectors: Item$;

export const detector_geometry_sequence: Item$;

export const threat_roi_voxel_sequence: Item$;

export const threat_roi_base: Item$;

export const threat_roi_extents: Item$;

export const threat_roi_bitmap: Item$;

export const route_segment_id: Item$;

export const gantry_type: Item$;

export const ooi_owner_type: Item$;

export const route_segment_sequence: Item$;

export const potential_threat_object_id: Item$;

export const threat_sequence: Item$;

export const threat_category: Item$;

export const threat_category_description: Item$;

export const atd_ability_assessment: Item$;

export const atd_assessment_flag: Item$;

export const atd_assessment_probability: Item$;

export const mass: Item$;

export const density: Item$;

export const z_effective: Item$;

export const boarding_pass_id: Item$;

export const center_of_mass: Item$;

export const center_of_pto: Item$;

export const bounding_polygon: Item$;

export const route_segment_start_location_id: Item$;

export const route_segment_end_location_id: Item$;

export const route_segment_location_id_type: Item$;

export const abort_reason: Item$;

export const volume_of_pto: Item$;

export const abort_flag: Item$;

export const route_segment_start_time: Item$;

export const route_segment_end_time: Item$;

export const tdr_type: Item$;

export const international_route_segment: Item$;

export const threat_detection_algorithm_and_version: Item$;

export const assigned_location: Item$;

export const alarm_decision_time: Item$;

export const alarm_decision: Item$;

export const number_of_total_objects: Item$;

export const number_of_alarm_objects: Item$;

export const pto_representation_sequence: Item$;

export const atd_assessment_sequence: Item$;

export const tip_type: Item$;

export const dicos_version: Item$;

export const ooi_owner_creation_time: Item$;

export const ooi_type: Item$;

export const ooi_size: Item$;

export const acquisition_status: Item$;

export const basis_materials_code_sequence: Item$;

export const phantom_type: Item$;

export const ooi_owner_sequence: Item$;

export const scan_type: Item$;

export const itinerary_id: Item$;

export const itinerary_id_type: Item$;

export const itinerary_id_assigning_authority: Item$;

export const route_id: Item$;

export const route_id_assigning_authority: Item$;

export const inbound_arrival_type: Item$;

export const carrier_id: Item$;

export const carrier_id_assigning_authority: Item$;

export const source_orientation: Item$;

export const source_position: Item$;

export const belt_height: Item$;

export const algorithm_routing_code_sequence: Item$;

export const transport_classification: Item$;

export const ooi_type_descriptor: Item$;

export const total_processing_time: Item$;

export const detector_calibration_data: Item$;

export const additional_screening_performed: Item$;

export const additional_inspection_selection_criteria: Item$;

export const additional_inspection_method_sequence: Item$;

export const ait_device_type: Item$;

export const qr_measurements_sequence: Item$;

export const target_material_sequence: Item$;

export const snr_threshold: Item$;

export const image_scale_representation: Item$;

export const referenced_pto_sequence: Item$;

export const referenced_tdr_instance_sequence: Item$;

export const pto_location_description: Item$;

export const anomaly_locator_indicator_sequence: Item$;

export const anomaly_locator_indicator: Item$;

export const pto_region_sequence: Item$;

export const inspection_selection_criteria: Item$;

export const secondary_inspection_method_sequence: Item$;

export const prcs_to_rcs_orientation: Item$;

export const mac_parameters_sequence: Item$;

export const curve_dimensions: Item$;

export const number_of_points: Item$;

export const type_of_data: Item$;

export const curve_description: Item$;

export const axis_units: Item$;

export const axis_labels: Item$;

export const data_value_representation: Item$;

export const minimum_coordinate_value: Item$;

export const maximum_coordinate_value: Item$;

export const curve_range: Item$;

export const curve_data_descriptor: Item$;

export const coordinate_start_value: Item$;

export const coordinate_step_value: Item$;

export const curve_activation_layer: Item$;

export const audio_type: Item$;

export const audio_sample_format: Item$;

export const number_of_channels: Item$;

export const number_of_samples: Item$;

export const sample_rate: Item$;

export const total_time: Item$;

export const audio_sample_data: Item$;

export const audio_comments: Item$;

export const curve_label: Item$;

export const curve_referenced_overlay_sequence: Item$;

export const curve_referenced_overlay_group: Item$;

export const curve_data: Item$;

export const shared_functional_groups_sequence: Item$;

export const per_frame_functional_groups_sequence: Item$;

export const waveform_sequence: Item$;

export const channel_minimum_value: Item$;

export const channel_maximum_value: Item$;

export const waveform_bits_allocated: Item$;

export const waveform_sample_interpretation: Item$;

export const waveform_padding_value: Item$;

export const waveform_data: Item$;

export const first_order_phase_correction_angle: Item$;

export const spectroscopy_data: Item$;

export const overlay_rows: Item$;

export const overlay_columns: Item$;

export const overlay_planes: Item$;

export const number_of_frames_in_overlay: Item$;

export const overlay_description: Item$;

export const overlay_type: Item$;

export const overlay_subtype: Item$;

export const overlay_origin: Item$;

export const image_frame_origin: Item$;

export const overlay_plane_origin: Item$;

export const overlay_compression_code: Item$;

export const overlay_compression_originator: Item$;

export const overlay_compression_label: Item$;

export const overlay_compression_description: Item$;

export const overlay_compression_step_pointers: Item$;

export const overlay_repeat_interval: Item$;

export const overlay_bits_grouped: Item$;

export const overlay_bits_allocated: Item$;

export const overlay_bit_position: Item$;

export const overlay_format: Item$;

export const overlay_location: Item$;

export const overlay_code_label: Item$;

export const overlay_number_of_tables: Item$;

export const overlay_code_table_location: Item$;

export const overlay_bits_for_code_word: Item$;

export const overlay_activation_layer: Item$;

export const overlay_descriptor_gray: Item$;

export const overlay_descriptor_red: Item$;

export const overlay_descriptor_green: Item$;

export const overlay_descriptor_blue: Item$;

export const overlays_gray: Item$;

export const overlays_red: Item$;

export const overlays_green: Item$;

export const overlays_blue: Item$;

export const roi_area: Item$;

export const roi_mean: Item$;

export const roi_standard_deviation: Item$;

export const overlay_label: Item$;

export const overlay_data: Item$;

export const overlay_comments: Item$;

export const extended_offset_table: Item$;

export const extended_offset_table_lengths: Item$;

export const encapsulated_pixel_data_value_total_length: Item$;

export const float_pixel_data: Item$;

export const double_float_pixel_data: Item$;

export const pixel_data: Item$;

export const coefficients_sdvn: Item$;

export const coefficients_sdhn: Item$;

export const coefficients_sddn: Item$;

export const variable_pixel_data: Item$;

export const variable_next_data_group: Item$;

export const variable_coefficients_sdvn: Item$;

export const variable_coefficients_sdhn: Item$;

export const variable_coefficients_sddn: Item$;

export const digital_signatures_sequence: Item$;

export const data_set_trailing_padding: Item$;

export const item: Item$;

export const item_delimitation_item: Item$;

export const sequence_delimitation_item: Item$;

export function find(
  tag: $data_element_tag.DataElementTag$,
  private_creator: $option.Option$<string>
): _.Result<Item$, undefined>;

export function tag_name(
  tag: $data_element_tag.DataElementTag$,
  private_creator: $option.Option$<string>
): string;

export function tag_with_name(
  tag: $data_element_tag.DataElementTag$,
  private_creator: $option.Option$<string>
): string;
