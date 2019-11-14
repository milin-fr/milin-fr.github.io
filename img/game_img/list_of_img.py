'''Below module allows us to interact with Windows files.'''
import os

'''below 3 lines allows script to check the directory where it is executed, so it knows where to crete the excel file. I copied the whole block from stack overflow'''
abspath = os.path.abspath(__file__)
current_directory = os.path.dirname(abspath)
os.chdir(current_directory)


def get_file_names_in_script_directory():
    file_names = []
    for root, dirs, files in os.walk(current_directory):
        for filename in files:
            file_names.append(filename)
    return file_names


list_of_images = get_file_names_in_script_directory()


def rename_files():
    for old_name in list_of_images:
        new_name = old_name.lower()
        os.rename(old_name, new_name)


print(list_of_images)
