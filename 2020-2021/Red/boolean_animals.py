# Initialize variables below with either True or False
# You can add additional variables if you want!
lion_is_tiger = 0
lion_is_lion = 1
lion_is_cat = 1
lion_is_animal = 1 

tiger_is_tiger = 1 
tiger_is_lion = 0
tiger_is_cat = 1
tiger_is_animal = 1 

cat_is_tiger = 0
cat_is_lion = 0
cat_is_cat = 1
cat_is_animal = 1 

cow_is_tiger = 0
cow_is_lion = 0
cow_is_cat = 0
cow_is_animal = 1 

# Show an example of all three gates below
# Use comments to explain what you are doing with each one

## Example of NOT gate
# in this example, the input is False
if cow_is_cat == 1 :
  print("NOT(cow_is_cat) is 0")
elif cow_is_cat == 0 :
  print("NOT(cow_is_cat) is 1")

# in this example, the input is True
if cat_is_cat == 1 :
  print("NOT(cat_is_cat) is 0")
elif cow_is_cat == 0 :
  print("NOT(cat_is_cat is 1")

## Example of AND gate
# two inputs and one output
# inputs: tiger_is_tiger, tiger_is_cat
# is it true that... a tiger is a tier AND a tiger is a cat. yes!
if tiger_is_tiger == 1 and tiger_is_cat == 1:
  print("true, a tiger is a tiger AND a tiger is a cat")

  # think of an attribute that is false, and rewrite this code so it gives you the correct answer! 








## Example of OR gate