/// <reference types="./code_strings.d.mts" />
import * as $data_element_tag from "../dcmfx_core/data_element_tag.mjs";
import * as $dictionary from "../dcmfx_core/dictionary.mjs";
import { Ok, Error, isEqual } from "../gleam.mjs";

export function describe(value, tag) {
  let tag$1 = tag;
  if (isEqual(tag$1, $dictionary.modality.tag)) {
    if (value === "ANN") {
      return new Ok("Annotation");
    } else if (value === "AR") {
      return new Ok("Autorefraction");
    } else if (value === "ASMT") {
      return new Ok("Content Assessment Results");
    } else if (value === "AU") {
      return new Ok("Audio");
    } else if (value === "BDUS") {
      return new Ok("Bone Densitometry (ultrasound)");
    } else if (value === "BI") {
      return new Ok("Biomagnetic imaging");
    } else if (value === "BMD") {
      return new Ok("Bone Densitometry (X-Ray)");
    } else if (value === "CFM") {
      return new Ok("Confocal Microscopy");
    } else if (value === "CR") {
      return new Ok("Computed Radiography");
    } else if (value === "CT") {
      return new Ok("Computed Tomography");
    } else if (value === "CTPROTOCOL") {
      return new Ok("CT Protocol (Performed)");
    } else if (value === "DMS") {
      return new Ok("Dermoscopy");
    } else if (value === "DG") {
      return new Ok("Diaphanography");
    } else if (value === "DOC") {
      return new Ok("Document");
    } else if (value === "DX") {
      return new Ok("Digital Radiography");
    } else if (value === "ECG") {
      return new Ok("Electrocardiography");
    } else if (value === "EEG") {
      return new Ok("Electroencephalography");
    } else if (value === "EMG") {
      return new Ok("Electromyography");
    } else if (value === "EOG") {
      return new Ok("Electrooculography");
    } else if (value === "EPS") {
      return new Ok("Cardiac Electrophysiology");
    } else if (value === "ES") {
      return new Ok("Endoscopy");
    } else if (value === "FID") {
      return new Ok("Fiducials");
    } else if (value === "GM") {
      return new Ok("General Microscopy");
    } else if (value === "HC") {
      return new Ok("Hard Copy");
    } else if (value === "HD") {
      return new Ok("Hemodynamic Waveform");
    } else if (value === "IO") {
      return new Ok("Intra-Oral Radiography");
    } else if (value === "IOL") {
      return new Ok("Intraocular Lens Data");
    } else if (value === "IVOCT") {
      return new Ok("Intravascular Optical Coherence Tomography");
    } else if (value === "IVUS") {
      return new Ok("Intravascular Ultrasound");
    } else if (value === "KER") {
      return new Ok("Keratometry");
    } else if (value === "KO") {
      return new Ok("Key Object Selection");
    } else if (value === "LEN") {
      return new Ok("Lensometry");
    } else if (value === "LS") {
      return new Ok("Laser surface scan");
    } else if (value === "MG") {
      return new Ok("Mammography");
    } else if (value === "MR") {
      return new Ok("Magnetic Resonance");
    } else if (value === "M3D") {
      return new Ok("Model for 3D Manufacturing");
    } else if (value === "NM") {
      return new Ok("Nuclear Medicine");
    } else if (value === "OAM") {
      return new Ok("Ophthalmic Axial Measurements");
    } else if (value === "OCT") {
      return new Ok("Optical Coherence Tomography (non-Ophthalmic)");
    } else if (value === "OP") {
      return new Ok("Ophthalmic Photography");
    } else if (value === "OPM") {
      return new Ok("Ophthalmic Mapping");
    } else if (value === "OPT") {
      return new Ok("Ophthalmic Tomography");
    } else if (value === "OPTBSV") {
      return new Ok("Ophthalmic Tomography B-scan Volume Analysis");
    } else if (value === "OPTENF") {
      return new Ok("Ophthalmic Tomography En Face");
    } else if (value === "OPV") {
      return new Ok("Ophthalmic Visual Field");
    } else if (value === "OSS") {
      return new Ok("Optical Surface Scan");
    } else if (value === "OT") {
      return new Ok("Other");
    } else if (value === "PA") {
      return new Ok("Photoacoustic");
    } else if (value === "PLAN") {
      return new Ok("Plan");
    } else if (value === "POS") {
      return new Ok("Position Sensor");
    } else if (value === "PR") {
      return new Ok("Presentation State");
    } else if (value === "PT") {
      return new Ok("Positron emission tomography (PET)");
    } else if (value === "PX") {
      return new Ok("Panoramic X-Ray");
    } else if (value === "REG") {
      return new Ok("Registration");
    } else if (value === "RESP") {
      return new Ok("Respiratory Waveform");
    } else if (value === "RF") {
      return new Ok("Radio Fluoroscopy");
    } else if (value === "RG") {
      return new Ok("Radiographic imaging (conventional film/screen)");
    } else if (value === "RTDOSE") {
      return new Ok("Radiotherapy Dose");
    } else if (value === "RTIMAGE") {
      return new Ok("Radiotherapy Image");
    } else if (value === "RTINTENT") {
      return new Ok("Radiotherapy Intent");
    } else if (value === "RTPLAN") {
      return new Ok("Radiotherapy Plan");
    } else if (value === "RTRAD") {
      return new Ok("RT Radiation");
    } else if (value === "RTRECORD") {
      return new Ok("RT Treatment Record");
    } else if (value === "RTSEGANN") {
      return new Ok("Radiotherapy Segment Annotation");
    } else if (value === "RTSTRUCT") {
      return new Ok("Radiotherapy Structure Set");
    } else if (value === "RWV") {
      return new Ok("Real World Value Map");
    } else if (value === "SEG") {
      return new Ok("Segmentation");
    } else if (value === "SM") {
      return new Ok("Slide Microscopy");
    } else if (value === "SMR") {
      return new Ok("Stereometric Relationship");
    } else if (value === "SR") {
      return new Ok("SR Document");
    } else if (value === "SRF") {
      return new Ok("Subjective Refraction");
    } else if (value === "STAIN") {
      return new Ok("Automated Slide Stainer");
    } else if (value === "TEXTUREMAP") {
      return new Ok("Texture Map");
    } else if (value === "TG") {
      return new Ok("Thermography");
    } else if (value === "US") {
      return new Ok("Ultrasound");
    } else if (value === "VA") {
      return new Ok("Visual Acuity");
    } else if (value === "XA") {
      return new Ok("X-Ray Angiography");
    } else if (value === "XAPROTOCOL") {
      return new Ok("XA Protocol (Performed)");
    } else if (value === "XC") {
      return new Ok("External-camera Photography");
    } else {
      return new Error(undefined);
    }
  } else {
    let tag$2 = tag;
    if (isEqual(tag$2, $dictionary.patient_sex.tag)) {
      if (value === "M") {
        return new Ok("Male");
      } else if (value === "F") {
        return new Ok("Female");
      } else if (value === "O") {
        return new Ok("Other");
      } else {
        return new Error(undefined);
      }
    } else {
      let tag$3 = tag;
      if (isEqual(tag$3, $dictionary.conversion_type.tag)) {
        if (value === "DV") {
          return new Ok("Digitized Video");
        } else if (value === "DI") {
          return new Ok("Digital Interface");
        } else if (value === "DF") {
          return new Ok("Digitized Film");
        } else if (value === "WSD") {
          return new Ok("Workstation");
        } else if (value === "SD") {
          return new Ok("Scanned Document");
        } else if (value === "SI") {
          return new Ok("Scanned Image");
        } else if (value === "DRW") {
          return new Ok("Drawing");
        } else if (value === "SYN") {
          return new Ok("Synthetic Image");
        } else {
          return new Error(undefined);
        }
      } else {
        let tag$4 = tag;
        if (isEqual(tag$4, $dictionary.scanning_sequence.tag)) {
          if (value === "SE") {
            return new Ok("Spin Echo");
          } else if (value === "IR") {
            return new Ok("Inversion Recovery");
          } else if (value === "GR") {
            return new Ok("Gradient Recalled");
          } else if (value === "EP") {
            return new Ok("Echo Planar");
          } else if (value === "RM") {
            return new Ok("Research Mode");
          } else {
            return new Error(undefined);
          }
        } else {
          let tag$5 = tag;
          if (isEqual(tag$5, $dictionary.sequence_variant.tag)) {
            if (value === "SK") {
              return new Ok("Segmented k-space");
            } else if (value === "MTC") {
              return new Ok("Magnetization transfer contrast");
            } else if (value === "SS") {
              return new Ok("Steady state");
            } else if (value === "TRSS") {
              return new Ok("Time reversed steady state");
            } else if (value === "SP") {
              return new Ok("Spoiled");
            } else if (value === "MP") {
              return new Ok("MAG prepared");
            } else if (value === "OSP") {
              return new Ok("Oversampling phase");
            } else if (value === "NONE") {
              return new Ok("No sequence variant");
            } else {
              return new Error(undefined);
            }
          } else {
            let tag$6 = tag;
            if (isEqual(tag$6, $dictionary.scan_options.tag)) {
              if (value === "PER") {
                return new Ok("Phase Encode Reordering");
              } else if (value === "RG") {
                return new Ok("Respiratory Gating");
              } else if (value === "CG") {
                return new Ok("Cardiac Gating");
              } else if (value === "PPG") {
                return new Ok("Peripheral Pulse Gating");
              } else if (value === "FC") {
                return new Ok("Flow Compensation");
              } else if (value === "PFF") {
                return new Ok("Partial Fourier - Frequency");
              } else if (value === "PFP") {
                return new Ok("Partial Fourier - Phase");
              } else if (value === "SP") {
                return new Ok("Spatial Presaturation");
              } else if (value === "FS") {
                return new Ok("Fat Saturation");
              } else {
                return new Error(undefined);
              }
            } else {
              let tag$7 = tag;
              if (isEqual(
                tag$7,
                $dictionary.acquisition_termination_condition.tag
              )) {
                if (value === "CNTS") {
                  return new Ok("Preset counts was reached");
                } else if (value === "DENS") {
                  return new Ok("Preset count density (counts/sec) was reached");
                } else if (value === "RDD") {
                  let _pipe = "Preset relative count density difference (change in counts/sec) was reached";
                  return new Ok(_pipe);
                } else if (value === "MANU") {
                  return new Ok("Acquisition was terminated manually");
                } else if (value === "OVFL") {
                  return new Ok("Data overflow occurred");
                } else if (value === "TIME") {
                  return new Ok("Preset time limit was reached");
                } else if (value === "CARD_TRIG") {
                  return new Ok("Preset number of cardiac triggers was reached");
                } else if (value === "RESP_TRIG") {
                  return new Ok(
                    "Preset number of respiratory triggers was reached",
                  );
                } else {
                  return new Error(undefined);
                }
              } else {
                let tag$8 = tag;
                if (isEqual(tag$8, $dictionary.rotation_direction.tag)) {
                  if (value === "CW") {
                    return new Ok("Clockwise");
                  } else if (value === "CC") {
                    return new Ok("Counter clockwise");
                  } else {
                    return new Error(undefined);
                  }
                } else {
                  let tag$9 = tag;
                  if (isEqual(tag$9, $dictionary.radiation_setting.tag)) {
                    if (value === "SC") {
                      let _pipe = "Low dose exposure generally corresponding to fluoroscopic settings";
                      return new Ok(_pipe);
                    } else if (value === "GR") {
                      return new Ok(
                        "High dose for diagnostic quality image acquisition",
                      );
                    } else {
                      return new Error(undefined);
                    }
                  } else {
                    let tag$10 = tag;
                    if (isEqual(tag$10, $dictionary.collimator_type.tag)) {
                      if (value === "PARA") {
                        return new Ok("Parallel (default)");
                      } else if (value === "PINH") {
                        return new Ok("Pinhole");
                      } else if (value === "FANB") {
                        return new Ok("Fan-beam");
                      } else if (value === "CONE") {
                        return new Ok("Cone-beam");
                      } else if (value === "SLNT") {
                        return new Ok("Slant hole");
                      } else if (value === "ASTG") {
                        return new Ok("Astigmatic");
                      } else if (value === "DIVG") {
                        return new Ok("Diverging");
                      } else if (value === "NONE") {
                        return new Ok("No collimator");
                      } else if (value === "UNKN") {
                        return new Ok("Unknown");
                      } else {
                        return new Error(undefined);
                      }
                    } else {
                      let tag$11 = tag;
                      if (isEqual(tag$11, $dictionary.whole_body_technique.tag)) {
                        if (value === "1PS") {
                          return new Ok("One pass");
                        } else if (value === "2PS") {
                          return new Ok("Two pass");
                        } else if (value === "PCN") {
                          return new Ok("Patient contour following employed");
                        } else if (value === "MSP") {
                          return new Ok(
                            "Multiple static frames collected into a whole body frame",
                          );
                        } else {
                          return new Error(undefined);
                        }
                      } else {
                        let tag$12 = tag;
                        if (isEqual(tag$12, $dictionary.patient_position.tag)) {
                          if (value === "HFP") {
                            return new Ok("Head First-Prone");
                          } else if (value === "HFS") {
                            return new Ok("Head First-Supine");
                          } else if (value === "HFDR") {
                            return new Ok("Head First-Decubitus Right");
                          } else if (value === "HFDL") {
                            return new Ok("Head First-Decubitus Left");
                          } else if (value === "FFDR") {
                            return new Ok("Feet First-Decubitus Right");
                          } else if (value === "FFDL") {
                            return new Ok("Feet First-Decubitus Left");
                          } else if (value === "FFP") {
                            return new Ok("Feet First-Prone");
                          } else if (value === "FFS") {
                            return new Ok("Feet First-Supine");
                          } else if (value === "LFP") {
                            return new Ok("Left First-Prone");
                          } else if (value === "LFS") {
                            return new Ok("Left First-Supine");
                          } else if (value === "RFP") {
                            return new Ok("Right First-Prone");
                          } else if (value === "RFS") {
                            return new Ok("Right First-Supine");
                          } else if (value === "AFDR") {
                            return new Ok("Anterior First-Decubitus Right");
                          } else if (value === "AFDL") {
                            return new Ok("Anterior First-Decubitus Left");
                          } else if (value === "PFDR") {
                            return new Ok("Posterior First-Decubitus Right");
                          } else if (value === "PFDL") {
                            return new Ok("Posterior First-Decubitus Left");
                          } else {
                            return new Error(undefined);
                          }
                        } else {
                          let tag$13 = tag;
                          if (isEqual(tag$13, $dictionary.view_position.tag)) {
                            if (value === "AP") {
                              return new Ok("Anterior/Posterior");
                            } else if (value === "PA") {
                              return new Ok("Posterior/Anterior");
                            } else if (value === "LL") {
                              return new Ok("Left Lateral");
                            } else if (value === "RL") {
                              return new Ok("Right Lateral");
                            } else if (value === "RLD") {
                              return new Ok("Right Lateral Decubitus");
                            } else if (value === "LLD") {
                              return new Ok("Left Lateral Decubitus");
                            } else if (value === "RLO") {
                              return new Ok("Right Lateral Oblique");
                            } else if (value === "LLO") {
                              return new Ok("Left Lateral Oblique");
                            } else {
                              return new Error(undefined);
                            }
                          } else {
                            let tag$14 = tag;
                            if (isEqual(
                              tag$14,
                              $dictionary.image_laterality.tag
                            )) {
                              if (value === "R") {
                                return new Ok("Right");
                              } else if (value === "L") {
                                return new Ok("Left");
                              } else if (value === "U") {
                                return new Ok("Unpaired");
                              } else if (value === "B") {
                                return new Ok("Both left and right");
                              } else {
                                return new Error(undefined);
                              }
                            } else {
                              let tag$15 = tag;
                              if (isEqual(
                                tag$15,
                                $dictionary.multienergy_detector_type.tag
                              )) {
                                if (value === "INTEGRATING") {
                                  return new Ok(
                                    "Physical detector integrates the full X-Ray spectrum",
                                  );
                                } else if (value === "MULTILAYER") {
                                  let _pipe = "Physical detector layers absorb different parts of the X-Ray spectrum";
                                  return new Ok(_pipe);
                                } else if (value === "PHOTON_COUNTING") {
                                  let _pipe = "Physical detector counts photons with energy discrimination capability";
                                  return new Ok(_pipe);
                                } else {
                                  return new Error(undefined);
                                }
                              } else {
                                let tag$16 = tag;
                                if (isEqual(
                                  tag$16,
                                  $dictionary.corrected_image.tag
                                )) {
                                  if (value === "UNIF") {
                                    return new Ok("Flood corrected");
                                  } else if (value === "COR") {
                                    return new Ok(
                                      "Center of rotation corrected",
                                    );
                                  } else if (value === "NCO") {
                                    return new Ok(
                                      "Non-circular orbit corrected",
                                    );
                                  } else if (value === "DECY") {
                                    return new Ok("Decay corrected");
                                  } else if (value === "ATTN") {
                                    return new Ok("Attenuation corrected");
                                  } else if (value === "SCAT") {
                                    return new Ok("Scatter corrected");
                                  } else if (value === "DTIM") {
                                    return new Ok("Dead time corrected");
                                  } else if (value === "NRGY") {
                                    return new Ok("Energy corrected");
                                  } else if (value === "LIN") {
                                    return new Ok("Linearity corrected");
                                  } else if (value === "MOTN") {
                                    return new Ok("Motion corrected");
                                  } else if (value === "CLN") {
                                    return new Ok("Count loss normalization");
                                  } else {
                                    return new Error(undefined);
                                  }
                                } else {
                                  let tag$17 = tag;
                                  if (isEqual(
                                    tag$17,
                                    $dictionary.pixel_intensity_relationship.tag
                                  )) {
                                    if (value === "LIN") {
                                      return new Ok(
                                        "Approximately proportional to X-Ray beam intensity",
                                      );
                                    } else if (value === "LOG") {
                                      return new Ok(
                                        "Non-linear \"Log Function\"",
                                      );
                                    } else if (value === "OTHER") {
                                      return new Ok(
                                        "Not proportional to X-Ray beam intensity",
                                      );
                                    } else {
                                      return new Error(undefined);
                                    }
                                  } else {
                                    let tag$18 = tag;
                                    if (isEqual(
                                      tag$18,
                                      $dictionary.lossy_image_compression.tag
                                    )) {
                                      if (value === "00") {
                                        return new Ok(
                                          "Image has not been subjected to lossy compression",
                                        );
                                      } else if (value === "01") {
                                        return new Ok(
                                          "Image has been subjected to lossy compression",
                                        );
                                      } else {
                                        return new Error(undefined);
                                      }
                                    } else {
                                      let tag$19 = tag;
                                      if (isEqual(
                                        tag$19,
                                        $dictionary.lossy_image_compression_method.tag
                                      )) {
                                        if (value === "ISO_10918_1") {
                                          return new Ok(
                                            "JPEG Lossy Compression [ISO/IEC 10918-1]",
                                          );
                                        } else if (value === "ISO_14495_1") {
                                          return new Ok(
                                            "JPEG-LS Near-lossless Compression [ISO/IEC 14495-1]",
                                          );
                                        } else if (value === "ISO_15444_1") {
                                          return new Ok(
                                            "JPEG 2000 Irreversible Compression [ISO/IEC 15444-1]",
                                          );
                                        } else if (value === "ISO_15444_15") {
                                          let _pipe = "High-Throughput JPEG 2000 Irreversible Compression [ISO/IEC 15444-15]";
                                          return new Ok(_pipe);
                                        } else if (value === "ISO_13818_2") {
                                          return new Ok(
                                            "MPEG2 Compression [ISO/IEC 13818-2]",
                                          );
                                        } else if (value === "ISO_14496_10") {
                                          return new Ok(
                                            "MPEG-4 AVC/H.264 Compression [ISO/IEC 14496-10]",
                                          );
                                        } else if (value === "ISO_23008_2") {
                                          return new Ok(
                                            "HEVC/H.265 Lossy Compression [ISO/IEC 23008-2]",
                                          );
                                        } else {
                                          return new Error(undefined);
                                        }
                                      } else {
                                        let tag$20 = tag;
                                        if (isEqual(
                                          tag$20,
                                          $dictionary.universal_entity_id_type.tag
                                        )) {
                                          if (value === "DNS") {
                                            return new Ok(
                                              "An Internet dotted name. Either in ASCII or as integers",
                                            );
                                          } else if (value === "EUI64") {
                                            return new Ok(
                                              "An IEEE Extended Unique Identifier",
                                            );
                                          } else if (value === "ISO") {
                                            return new Ok(
                                              "An International Standards Organization Object Identifier",
                                            );
                                          } else if (value === "URI") {
                                            return new Ok(
                                              "Uniform Resource Identifier",
                                            );
                                          } else if (value === "UUID") {
                                            return new Ok(
                                              "The DCE Universal Unique Identifier",
                                            );
                                          } else if (value === "X400") {
                                            return new Ok(
                                              "An X.400 MHS identifier",
                                            );
                                          } else if (value === "X500") {
                                            return new Ok(
                                              "An X.500 directory name",
                                            );
                                          } else {
                                            return new Error(undefined);
                                          }
                                        } else {
                                          let tag$21 = tag;
                                          if (isEqual(
                                            tag$21,
                                            $dictionary.slice_progression_direction.tag
                                          )) {
                                            if (value === "APEX_TO_BASE") {
                                              return new Ok("Apex to base");
                                            } else if (value === "BASE_TO_APEX") {
                                              return new Ok("Base to apex");
                                            } else if (value === "ANT_TO_INF") {
                                              return new Ok(
                                                "Anterior to inferior",
                                              );
                                            } else if (value === "INF_TO_ANT") {
                                              return new Ok(
                                                "Inferior to anterior",
                                              );
                                            } else if (value === "SEPTUM_TO_WALL") {
                                              return new Ok(
                                                "Septum to lateral wall",
                                              );
                                            } else if (value === "WALL_TO_SEPTUM") {
                                              return new Ok(
                                                "Lateral wall to septum",
                                              );
                                            } else {
                                              return new Error(undefined);
                                            }
                                          } else {
                                            let tag$22 = tag;
                                            if (((tag$22.group >= $dictionary.overlay_type.tag.group) && (tag$22.group <= ($dictionary.overlay_type.tag.group + 0xFF))) && (tag$22.element === $dictionary.overlay_type.tag.element)) {
                                              if (value === "G") {
                                                return new Ok("Graphics");
                                              } else if (value === "R") {
                                                return new Ok("ROI");
                                              } else {
                                                return new Error(undefined);
                                              }
                                            } else {
                                              return new Error(undefined);
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
